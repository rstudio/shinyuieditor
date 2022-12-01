import type { MessageFromBackend, MessageToBackend } from "communication-types";
import { isMessageFromClient } from "communication-types";
import debounce from "just-debounce-it";
import * as vscode from "vscode";

import { addUiTextToFile } from "./addUiTextToFile";
import { clearAppFile } from "./clearAppFile";
import { openCodeCompanion } from "./openCodeCompanion";
import { checkIfPkgAvailable } from "./R-Utils/checkIfPkgAvailable";
import { generateAppTemplate } from "./R-Utils/generateAppTemplate";
import type { ParsedApp } from "./R-Utils/parseAppFile";
import { getAppFile } from "./R-Utils/parseAppFile";
import type { ActiveRSession } from "./R-Utils/startBackgroundRProcess";
import { startPreviewApp } from "./R-Utils/startPreviewApp";
import { updateAppUI } from "./updateAppUI";

const { showErrorMessage } = vscode.window;

export function editorLogic({
  RProcess,
  document,
  sendMessage,
}: {
  RProcess: ActiveRSession;
  document: vscode.TextDocument;
  sendMessage: (msg: MessageFromBackend) => Thenable<boolean>;
}) {
  console.log("Starting up main editor logic function!");
  let hasInitialized: boolean = false;

  let latestAppWrite: string | null = null;

  let uiBounds: ParsedApp["ui_bounds"] | undefined;

  /**
   * Plain text editor with apps code side-by-side with custom editor
   */
  let codeCompanionEditor: vscode.TextEditor | null = null;

  const syncFileToClientState = async () => {
    const appFileText = document.getText();

    // Check to make sure we're not just picking up a change that we made
    const updateWeMade =
      latestAppWrite !== null && appFileText.includes(latestAppWrite);

    // Skip unneccesary app file parsing
    if (updateWeMade) return;

    // If it's our first time connecting to the viewer, load our libraries and
    // let the user know if this failed and they need to fix it.
    if (!hasInitialized) {
      const pkgsLoaded = await checkIfPkgAvailable(RProcess, "shinyuieditor");

      if (pkgsLoaded.status === "error") {
        sendMessage({
          path: "BACKEND-ERROR",
          payload: pkgsLoaded.msg,
        });
        showErrorMessage(pkgsLoaded.msg);
        throw new Error(pkgsLoaded.msg);
      }

      hasInitialized = true;
    }

    const appFileInfo = await getAppFile(appFileText, RProcess);
    if (appFileInfo === "EMPTY") {
      sendMessage({
        path: "TEMPLATE_CHOOSER",
        payload: "SINGLE-FILE",
      });
    } else {
      const { ui_tree } = appFileInfo;

      uiBounds = appFileInfo.ui_bounds;
      sendMessage({
        path: "UPDATED-TREE",
        payload: ui_tree,
      });
    }
  };

  const syncFileToClientStateDebounced = debounce(syncFileToClientState, 500);

  const onDocumentChanged = () => {
    syncFileToClientStateDebounced();
  };

  const onDocumentSaved = () => {
    // Make sure to immediately fire any changes to sync on save so there's not a lag.
    syncFileToClientStateDebounced.flush();
  };

  const previewAppInfo = startPreviewApp({
    pathToApp: document.fileName,
    onInitiation: () => {
      sendMessage({
        path: "APP-PREVIEW-STATUS",
        payload: "LOADING",
      });
    },
    onReady: (url) => {
      sendMessage({
        path: "APP-PREVIEW-STATUS",
        payload: { url },
      });
    },
    onFailToStart: () => {
      sendMessage({
        path: "APP-PREVIEW-CRASH",
        payload: "Failed to start",
      });
    },
    onCrash: () => {
      sendMessage({
        path: "APP-PREVIEW-CRASH",
        payload: "Crashed",
      });
    },
    onLogs: (logs) => {
      sendMessage({
        path: "APP-PREVIEW-LOGS",
        payload: logs,
      });
    },
  });

  // Receive message from the webview.
  const onDidReceiveMessage = async (msg: MessageToBackend) => {
    if (isMessageFromClient(msg)) {
      switch (msg.path) {
        case "READY-FOR-STATE":
          syncFileToClientState();
          // Let client know we're in vscode mode
          sendMessage({
            path: "RUNTIME-TYPE",
            payload: "VSCODE",
          });
          return;

        case "TEMPLATE-SELECTION": {
          const appFile = await generateAppTemplate(RProcess, msg.payload);

          await addUiTextToFile({
            text: appFile,
            document,
            type: "insert",
            uiBounds,
          });
          return;
        }

        case "UPDATED-TREE": {
          const updateRes = await updateAppUI({
            document,
            uiBounds,
            RProcess,
            uiTree: msg.payload,
          });
          latestAppWrite = updateRes.uiText;
          uiBounds = updateRes.uiBounds;
          return;
        }
        case "APP-PREVIEW-REQUEST": {
          previewAppInfo.start();
          return;
        }
        case "APP-PREVIEW-STOP": {
          previewAppInfo.stop();
          return;
        }
        case "APP-PREVIEW-RESTART": {
          previewAppInfo.start();
          return;
        }
        case "ENTERED-TEMPLATE-SELECTOR": {
          previewAppInfo.stop();
          await clearAppFile(document);
          return;
        }
        case "OPEN-COMPANION-EDITOR": {
          if (
            codeCompanionEditor &&
            vscode.window.visibleTextEditors.includes(codeCompanionEditor)
          ) {
            // Avoid opening secondary companion editor
            return;
          }
          codeCompanionEditor = await openCodeCompanion(document);

          return;
        }
        default:
          console.warn("Unhandled message from client", msg);
      }
    } else {
      console.log("Unknown message from webview", msg);
    }
  };

  return {
    onDocumentChanged,
    onDocumentSaved,
    onDidReceiveMessage,
  };
}
