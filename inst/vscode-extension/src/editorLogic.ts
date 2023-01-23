import { ast_to_ui_info } from "ast-parsing/src/ast_to_shiny_ui_node";
import type {
  MessageToBackend,
  MessageToClient,
  OutputType,
} from "communication-types";
import { isMessageFromClient } from "communication-types";
import type { ShinyUiNode } from "editor";
import debounce from "just-debounce-it";
import * as vscode from "vscode";

import { addUiTextToFile } from "./addUiTextToFile";
import { clearAppFile } from "./clearAppFile";
import { openCodeCompanionEditor } from "./extension-api-utils/openCodeCompanionEditor";
import { selectLinesInEditor } from "./extension-api-utils/selectLinesInEditor";
import { checkIfPkgAvailable } from "./R-Utils/checkIfPkgAvailable";
import { generateAppTemplate } from "./R-Utils/generateAppTemplate";
import { getAppAST } from "./R-Utils/getAppAST";
import type { ActiveRSession } from "./R-Utils/startBackgroundRProcess";
import { startPreviewApp } from "./R-Utils/startPreviewApp";
import {
  selectInputReferences,
  selectOutputReferences,
} from "./selectServerReferences";
import { updateAppUI } from "./updateAppUI";

const { showErrorMessage } = vscode.window;

export type ParsedApp = {
  file_lines: string[];
  loaded_libraries: string[];
  type: OutputType;
  ui_bounds: {
    start: number;
    end: number;
    startCol?: number;
    endCol?: number;
  };
  ui_tree: ShinyUiNode;
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

  let latestAppWrite: string | null = null;

  let uiBounds: ParsedApp["ui_bounds"] | undefined;

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
      const appAST = await getAppAST(RProcess, appFileText);

      if (appAST.status === "error") {
        sendMessage({
          path: "BACKEND-ERROR",
          payload: {
            context: "parsing app",
            msg: appAST.errorMsg,
          },
        });
        showErrorMessage(appAST.errorMsg);
        return;
      }

      if (appAST.values === "EMPTY") {
        sendMessage({
          path: "TEMPLATE_CHOOSER",
          payload: "SINGLE-FILE",
        });
        return;
      }

      const {
        ui_tree,
        ui_pos: [start_row, start_col, end_row, end_col],
        ui_assignment_operator,
      } = ast_to_ui_info(appAST.values);

      // const { ui_tree } = appFileInfo.values;
      uiBounds = {
        start: start_row,
        startCol: start_col,
        end: end_row,
        endCol: end_col,
      };
      sendMessage({
        path: "UPDATED-TREE",
        payload: ui_tree,
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
    if (isMessageFromClient(msg)) {
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
              RProcess,
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
