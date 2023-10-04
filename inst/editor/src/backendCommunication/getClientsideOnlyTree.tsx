import type { LanguageMode } from "communication-types/src/AppInfo";

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
        if ("app_script" in r && "language" in r) {
          resolve(r);
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
