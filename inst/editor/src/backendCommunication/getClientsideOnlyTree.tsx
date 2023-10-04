import type { LanguageMode } from "communication-types/src/AppInfo";

import { ui_tree_to_script } from "./staticBackend";

export type MinimalAppInfo = {
  app_script: string;
  language: LanguageMode;
};
/**
 * Get a ui tree to populate app state with either from prebuilt trees or from a
 * (typically mocked) `/testing-tree` api endpoint
 * @returns Promise containing a ui tree to use as initial state for app
 */
export async function getClientsideOnlyTree(defaultInfo: MinimalAppInfo) {
  return new Promise<MinimalAppInfo>((resolve, reject) => {
    // If we're in testing mode we first attempt to get the tree from a testing
    // url if that fails due to the test not mocking the tree then just give the
    // default testing tree
    fetch("/testing-tree")
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        if ("ui_tree" in r && "language" in r) {
          // Convert UI tree to basic app script
          // If a ui tree has been passed, then we should convert that into a simple app
          // before sending over
          const ui_tree = r.ui_tree;

          const info: MinimalAppInfo = {
            app_script:
              ui_tree === "TEMPLATE_CHOOSER"
                ? ui_tree
                : ui_tree_to_script({
                    ui_tree: ui_tree,
                    language: r.language,
                  }),
            language: r.language,
          };

          console.log("Generated info from tree", info);

          resolve(info);
        } else {
          reject("No ui_tree or language in response");
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error("/testing-tree error", e);
        resolve(defaultInfo);
      });
  });
}
