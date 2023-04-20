import type { ShinyUiRootNode } from "ui-node-definitions/src/uiNodeTypes";

/**
 * Get a ui tree to populate app state with either from prebuilt trees or from a
 * (typically mocked) `/testing-tree` api endpoint
 * @returns Promise containing a ui tree to use as initial state for app
 */
export async function getClientsideOnlyTree(defaultTree: ShinyUiRootNode) {
  return new Promise<ShinyUiRootNode>((resolve) => {
    // If we're in testing mode we first attempt to get the tree from a testing
    // url if that fails due to the test not mocking the tree then just give the
    // default testing tree
    fetch("/testing-tree")
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        resolve(r);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error("/testing-tree error", e);
        resolve(defaultTree);
      });
  });
}
