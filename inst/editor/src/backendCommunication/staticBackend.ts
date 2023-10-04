import type { BackendConnection, MessageDispatcher } from "communication-types";
import type { LanguageMode } from "communication-types/src/AppInfo";
import { makeMessageDispatcher } from "communication-types/src/BackendConnection";

import { generateUiScript } from "../ui-node-definitions/code_generation/generate_ui_script";
import type { ShinyUiNode } from "../ui-node-definitions/ShinyUiNode";

import type { MinimalAppInfo } from "./getClientsideOnlyTree";
import { getClientsideOnlyTree } from "./getClientsideOnlyTree";

export function setupStaticBackend({
  messageDispatch,
  showMessages,
  defaultInfo,
}: {
  messageDispatch: MessageDispatcher;
  showMessages: boolean;
  defaultInfo: MinimalAppInfo;
}) {
  const language = defaultInfo.language;
  // eslint-disable-next-line no-console
  const logger = showMessages ? console.log : (...args: any[]) => {};

  let inTemplateChooser = defaultInfo.app_script === "TEMPLATE_CHOOSER";

  const messagePassingMethods: BackendConnection = {
    sendMsg: (msg) => {
      logger("Static sendMsg()", msg);
      switch (msg.path) {
        case "READY-FOR-STATE": {
          // Send initial checkin msg
          messageDispatch.dispatch("CHECKIN", {
            language,
            server_aware: false,
            app_preview: false,
          });

          getClientsideOnlyTree(defaultInfo).then(
            ({ app_script, language }) => {
              if (app_script === "TEMPLATE_CHOOSER") {
                messageDispatch.dispatch("TEMPLATE_CHOOSER", "please");
              } else {
                messageDispatch.dispatch("APP-SCRIPT-TEXT", {
                  language,
                  app_script,
                });
              }
            }
          );
          return;
        }
        case "ENTERED-TEMPLATE-SELECTOR": {
          inTemplateChooser = true;
          return;
        }
        case "UPDATED-APP": {
          const appIsTemplateChooser =
            msg.payload.app_script === "TEMPLATE_CHOOSER";

          // We only need to send the message if the app script has changed from
          // or to template chooser mode. Otherwise the client state will take
          // care of it for us.
          if (inTemplateChooser !== appIsTemplateChooser) {
            inTemplateChooser = appIsTemplateChooser;
            messageDispatch.dispatch("APP-SCRIPT-TEXT", {
              ...msg.payload,
              language,
            });
          }
          return;
        }
        case "APP-PREVIEW-REQUEST": {
          // Ignore
          return;
        }
      }
    },
    incomingMsgs: messageDispatch,
    mode: "STATIC",
  };
  return messagePassingMethods;
}

/**
 * Create a static backend object for a given ui tree.
 * @param defaultTree Tree to use as default. Defaults to special value of
 * `"TEMPLATE_CHOOSER"` which will show the template chooser.
 * @param language Language to use. Defaults to `"R"`.
 * @returns A backend object that can be used to communicate with the frontend.
 */
export function staticDispatchFromTree(
  defaultTree?: ShinyUiNode,
  language: LanguageMode = "R"
) {
  return setupStaticBackend({
    messageDispatch: makeMessageDispatcher(),
    showMessages: true,
    defaultInfo: {
      language,
      app_script: defaultTree
        ? ui_tree_to_script({ ui_tree: defaultTree, language })
        : "TEMPLATE_CHOOSER",
    },
  });
}

/**
 * Go from a ui tree to a simple bare-bones app script. Used primarily so we can
 * have type-safe demo trees for testing
 * @param ui_tree The ui tree to convert
 * @param language The language to use
 * @returns A simple app script
 */
export function ui_tree_to_script({
  ui_tree,
  language,
}: {
  ui_tree: ShinyUiNode;
  language: LanguageMode;
}): string {
  return generateUiScript({
    ui_tree,
    language,
    packages: [],
    code: "",
  });
}
