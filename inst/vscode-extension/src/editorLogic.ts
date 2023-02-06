import type { MessageToBackend } from "communication-types/src/MessageToBackend";
import { isMessageToBackend } from "communication-types/src/MessageToBackend";
import type { MessageToClient } from "communication-types/src/MessageToClient";
import debounce from "just-debounce-it";
import * as vscode from "vscode";

import { addUiTextToFile } from "./addUiTextToFile";
import { clearAppFile } from "./clearAppFile";
import { openCodeCompanionEditor } from "./extension-api-utils/openCodeCompanionEditor";
import { selectLinesInEditor } from "./extension-api-utils/selectLinesInEditor";
import { checkIfPkgAvailable } from "./R-Utils/checkIfPkgAvailable";
import { generateAppTemplate } from "./R-Utils/generateAppTemplate";
import { setup_app_parser } from "./R-Utils/parseRApp";
import type { ActiveRSession } from "./R-Utils/startBackgroundRProcess";
import { startPreviewApp } from "./R-Utils/startPreviewApp";
import {
  selectInputReferences,
  selectOutputReferences,
} from "./selectServerReferences";
import { updateAppUI } from "./updateAppUI";

const { showErrorMessage } = vscode.window;

export type App_Location = {
  start_row: number;
  end_row: number;
  start_col: number;
  end_col: number;
};

export function editorLogic({
  RProcess,
  document,
  sendMessage,
}: {
  RProcess: ActiveRSession;
  document: vscode.TextDocument;
  sendMessage: (msg: MessageToClient) => Thenable<boolean>;
}) {
  let hasInitialized: boolean = false;

  // Can probably replace this with the vscode.TextDocument's version field
  let latestAppWrite: string | null = null;

  let uiBounds: App_Location | undefined;

  const get_ast = setup_app_parser(RProcess, document);

  /**
   * Plain text editor with apps code side-by-side with custom editor
   */
  let codeCompanionEditor: vscode.TextEditor | undefined = undefined;

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
          payload: {
            context: "checking for shinyuieditor package",
            msg: pkgsLoaded.msg,
          },
        });
        showErrorMessage(pkgsLoaded.msg);
        throw new Error(pkgsLoaded.msg);
      }

      hasInitialized = true;
    }

    try {
      const appAST = await get_ast();

      if (appAST.type === "ERROR") {
        sendMessage({
          path: "BACKEND-ERROR",
          payload: {
            context: "parsing app",
            msg: appAST.message,
          },
        });
        showErrorMessage(appAST.message);
        return;
      }

      if (appAST.type === "EMPTY") {
        sendMessage({
          path: "TEMPLATE_CHOOSER",
          payload: "SINGLE-FILE",
        });
        return;
      }

      const [start_row, start_col, end_row, end_col] = appAST.ui_pos;

      uiBounds = { start_row, start_col, end_row, end_col };

      sendMessage({
        path: "UPDATED-TREE",
        payload: appAST.ui_tree,
      });
    } catch (e) {
      console.error("Failed to parse", e);
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
    if (isMessageToBackend(msg)) {
      console.log("Msg from client", msg);
      switch (msg.path) {
        case "READY-FOR-STATE":
          syncFileToClientState();
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

        case "UPDATED-UI": {
          console.log(msg.payload);
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
          codeCompanionEditor = await openCodeCompanionEditor({
            appFile: document,
            existingEditor: codeCompanionEditor,
          });

          if (uiBounds) {
            selectLinesInEditor(uiBounds, codeCompanionEditor);
          }

          return;
        }
        case "GO-TO-SERVER": {
          codeCompanionEditor = await openCodeCompanionEditor({
            appFile: document,
            existingEditor: codeCompanionEditor,
          });

          if (msg.payload.type === "Output") {
            selectOutputReferences({
              editor: codeCompanionEditor,
              output: msg.payload,
              get_ast,
            });
          } else {
            selectInputReferences({
              editor: codeCompanionEditor,
              input: msg.payload,
            });
          }

          return;
        }
        case "NODE-SELECTION": {
          console.log("New node selection", msg.payload);
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
