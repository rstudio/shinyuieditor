import type { LanguageMode } from "communication-types/src/AppInfo";
import type { MessageToBackend } from "communication-types/src/MessageToBackend";
import { isMessageToBackend } from "communication-types/src/MessageToBackend";
import type { MessageToClient } from "communication-types/src/MessageToClient";
import debounce from "just-debounce-it";
import * as vscode from "vscode";

import { startPreviewApp } from "./app-preview/startPreviewApp";
import { clearAppFile } from "./extension-api-utils/clearAppFile";
import { insertCodeSnippet } from "./extension-api-utils/insert_code_snippet";
import { openCodeCompanionEditor } from "./extension-api-utils/openCodeCompanionEditor";
import { updateAppFile } from "./extension-api-utils/update_app_file";
import { buildPythonAppParser } from "./Python-Utils/build_python_app_parser";
import { buildRAppParser } from "./R-Utils/build_R_app_parser";
import { selectAppLines } from "./selectServerReferences";
import type { ParsedAppInfo } from "./ui_tree_has_changed";
import { uiTreeHasChanged } from "./ui_tree_has_changed";

const { showErrorMessage } = vscode.window;

export type AppLocation = {
  start_row: number;
  end_row: number;
  start_col: number;
  end_col: number;
};

/**
 * The main logic source for the UI editor. This is loaded by the extension.ts
 * file and is responsible for handling all of the communication between the UI
 * editor and the VSCode extension.
 *
 * @param language Mode of the app (`R` or `PYTHON`)
 * @param document The vscode document that is being edited
 * @param sendMessage Function used to send messages to the UI editor.
 *
 * @returns An object with functions that should be called when the document is
 * changed, saved, or a message is received from the UI editor.
 */
export async function editorLogic({
  language,
  document,
  sendMessage,
}: {
  language: LanguageMode;
  document: vscode.TextDocument;
  sendMessage: (msg: MessageToClient) => Thenable<boolean>;
}) {
  // Start by initializing some state variables

  // Whether or not we've initialized the app. This is used to make sure we
  // don't try to run script validation checks etc mode than once.
  let hasInitialized: boolean = false;

  // Can probably replace this with the vscode.TextDocument's version field
  let latestAppWrite: string | null = null;

  // Plain text editor with apps code side-by-side with custom editor
  let codeCompanionEditor: vscode.TextEditor | undefined = undefined;

  // The last parsed app info. This is used to make sure we don't send the same
  // app info to the UI editor multiple times.
  let previous_parsed_info: ParsedAppInfo | undefined;

  // The app info parser. This is used to parse the app for things like the UI
  // tree and server info.
  const appInfoParser = await (language === "R"
    ? buildRAppParser(document)
    : buildPythonAppParser(document));

  // On the first time connecting to the viewer, load our libraries and
  // let the user know if this failed and they need to fix it.
  async function initializeUiEditor() {
    const pkgsLoaded = await appInfoParser.check_if_pkgs_installed(
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
  }

  function requestTemplateChooser() {
    sendMessage({
      path: "TEMPLATE_CHOOSER",
      payload: "SINGLE-FILE",
    });
  }

  // Function to keep the app info as represented by the file in sync with the
  // app info as represented by the UI editor. This runs every time a change in the file
  // is detected by vscode.
  const syncFileToClientState = async () => {
    const appFileText = document.getText();

    // Check to make sure we're not just picking up a change that we made so we can skip
    // unnecessary parsing.
    const updateWeMade =
      latestAppWrite !== null && appFileText.includes(latestAppWrite);
    if (updateWeMade) return;

    // If we haven't initialized the app yet, do so now.
    if (!hasInitialized) {
      await initializeUiEditor();

      // Let client know that we can edit the server code
      sendMessage({ path: "CHECKIN", payload: { server_aware: true } });
      hasInitialized = true;
    }

    // Empty app scripts are interpreted as us needing to open the template
    // chooser interface.
    if (appFileText === "") {
      requestTemplateChooser();
      return;
    }

    // Main parsing logic is wrapped in a try/catch so that invalid app scripts
    // etc don't bring down the whole editor but instead just show an error
    // message that can be recovered from
    try {
      const app_info_fetch = await appInfoParser.getInfo();

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
        requestTemplateChooser();
        return;
      }

      latestAppWrite = appFileText;
      // If the app info hasn't changed since the last time we parsed it, skip
      // the rest of the logic
      const have_new_app_info = uiTreeHasChanged(
        previous_parsed_info,
        app_info_fetch
      );

      previous_parsed_info = app_info_fetch;

      if (!have_new_app_info) {
        // No syntactical change, ending-early
        return;
      }

      sendMessage({
        path: "APP-INFO",
        payload: app_info.ui,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Failed to parse", e);
    }
  };

  // Debounce the sync function so that we don't try to sync the app file to the
  // UI editor too when the user is doing something like typing.
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

  // Request a companionm editor if one doesn't exist, otherwise return the
  // existing one.
  const get_companion_editor = async () => {
    codeCompanionEditor = await openCodeCompanionEditor({
      document,
      existingEditor: codeCompanionEditor,
    });

    return codeCompanionEditor;
  };

  // Handle messages from the client
  const onDidReceiveMessage = async (msg: MessageToBackend) => {
    if (isMessageToBackend(msg)) {
      switch (msg.path) {
        case "READY-FOR-STATE":
          syncFileToClientState();
          return;

        case "UPDATED-APP": {
          if (msg.payload.app_type === "MULTI-FILE") return;

          const app_file_was_updated = await updateAppFile({
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
          const info_fetch = await appInfoParser.getInfo();
          if (
            info_fetch.status === "success" &&
            info_fetch.values !== "EMPTY" &&
            info_fetch.values.server
          ) {
            insertCodeSnippet({
              language,
              editor: await get_companion_editor(),
              server_info: info_fetch.values.server,
              ...msg.payload,
            });
          }
          return;
        }

        case "FIND-SERVER-USES": {
          const app_info_fetch = await appInfoParser.getInfo();
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

          selectAppLines({
            editor: await get_companion_editor(),
            selections: server_locations,
          });

          return;
        }
        default:
          // eslint-disable-next-line no-console
          console.warn("Unhandled message from client", msg);
      }
    } else {
      // eslint-disable-next-line no-console
      console.warn("Unknown message from webview", msg);
    }
  };

  return {
    onDocumentChanged,
    onDocumentSaved,
    onDidReceiveMessage,
  };
}
