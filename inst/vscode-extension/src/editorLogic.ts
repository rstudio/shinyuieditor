import type { Language_Mode } from "communication-types/src/AppInfo";
import type { MessageToBackend } from "communication-types/src/MessageToBackend";
import { isMessageToBackend } from "communication-types/src/MessageToBackend";
import type { MessageToClient } from "communication-types/src/MessageToClient";
import debounce from "just-debounce-it";
import * as vscode from "vscode";

import { startPreviewApp } from "./app-preview/startPreviewApp";
import { clearAppFile } from "./clearAppFile";
import { openCodeCompanionEditor } from "./extension-api-utils/openCodeCompanionEditor";
import { insert_code_snippet } from "./insert_code_snippet";
import { build_python_app_parser } from "./Python-Utils/build_python_app_parser";
import { build_R_app_parser } from "./R-Utils/build_R_app_parser";
import { select_app_lines } from "./selectServerReferences";
import type { Parsed_App_Info } from "./ui_tree_has_changed";
import { ui_tree_has_changed } from "./ui_tree_has_changed";
import { update_app_file } from "./update_app_file";

const { showErrorMessage } = vscode.window;

export type App_Location = {
  start_row: number;
  end_row: number;
  start_col: number;
  end_col: number;
};

export async function editorLogic({
  language,
  document,
  sendMessage,
}: {
  language: Language_Mode;
  document: vscode.TextDocument;
  sendMessage: (msg: MessageToClient) => Thenable<boolean>;
}) {
  // TODO: Come up with a better name for this
  const app_info_getter =
    language === "R"
      ? await build_R_app_parser(document)
      : await build_python_app_parser(document);

  const get_app_info = app_info_getter.getInfo;

  let hasInitialized: boolean = false;

  // Can probably replace this with the vscode.TextDocument's version field
  let latestAppWrite: string | null = null;

  /**
   * Plain text editor with apps code side-by-side with custom editor
   */
  let codeCompanionEditor: vscode.TextEditor | undefined = undefined;
  let previous_parsed_info: Parsed_App_Info | undefined;

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
      const pkgsLoaded = await app_info_getter.check_if_pkgs_installed(
        "shinyuieditor"
      );

      if (!pkgsLoaded.success) {
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

    if (appFileText === "") {
      sendMessage({
        path: "TEMPLATE_CHOOSER",
        payload: "SINGLE-FILE",
      });
      return;
    }

    try {
      const app_info_fetch = await get_app_info();

      if (app_info_fetch.status === "error") {
        sendMessage({
          path: "BACKEND-ERROR",
          payload: {
            context: "parsing app",
            msg: app_info_fetch.errorMsg,
          },
        });
        // Error means that there is no latest app write. If we don't set this
        // the app will think nothing has changed after problem is fixed if it
        // is simply reverted.
        latestAppWrite = null;
        return;
      }

      const app_info = app_info_fetch.values;
      if (app_info === "EMPTY") {
        sendMessage({
          path: "TEMPLATE_CHOOSER",
          payload: "SINGLE-FILE",
        });
        return;
      }

      latestAppWrite = appFileText;
      // If the app info hasn't changed since the last time we parsed it, skip
      // the rest of the logic
      const have_new_app_info = ui_tree_has_changed(
        previous_parsed_info,
        app_info_fetch
      );

      previous_parsed_info = app_info_fetch;

      if (!have_new_app_info) {
        console.log("No syntactical change, ending-early");
        return;
      } else {
        console.log("Updating");
      }
      sendMessage({
        path: "APP-INFO",
        payload: app_info.ui,
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
    language,
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

  const get_companion_editor = async () => {
    codeCompanionEditor = await openCodeCompanionEditor({
      appFile: document,
      existingEditor: codeCompanionEditor,
    });

    return codeCompanionEditor;
  };

  // Receive message from the webview.
  const onDidReceiveMessage = async (msg: MessageToBackend) => {
    if (isMessageToBackend(msg)) {
      switch (msg.path) {
        case "READY-FOR-STATE":
          syncFileToClientState();
          return;

        case "UPDATED-APP": {
          if (msg.payload.app_type === "MULTI-FILE") return;

          const app_file_was_updated = await update_app_file({
            script_text: msg.payload.app,
            document,
          });

          if (app_file_was_updated) {
            latestAppWrite = msg.payload.app;
          }

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
          await get_companion_editor();
          return;
        }
        case "INSERT-SNIPPET": {
          const info_fetch = await get_app_info();
          if (
            info_fetch.status === "success" &&
            info_fetch.values !== "EMPTY" &&
            info_fetch.values.server
          ) {
            insert_code_snippet({
              language,
              editor: await get_companion_editor(),
              server_info: info_fetch.values.server,
              ...msg.payload,
            });
          }
          return;
        }

        case "FIND-SERVER-USES": {
          const app_info_fetch = await get_app_info();
          if (
            app_info_fetch.status !== "success" ||
            app_info_fetch.values === "EMPTY"
          ) {
            return;
          }

          const server_info = app_info_fetch.values.server;

          const server_locations =
            msg.payload.type === "Input"
              ? server_info.get_input_positions(msg.payload.inputId)
              : server_info.get_output_position(msg.payload.outputId);

          select_app_lines({
            editor: await get_companion_editor(),
            selections: server_locations,
          });

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
