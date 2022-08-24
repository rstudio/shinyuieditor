import { TESTING_MODE } from "env_variables";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import { sampleAppTree, testingUiTree } from "../state/backupUiTree";

/**
 * Get a ui tree to populate app state with either from prebuilt trees or from a
 * (typically mocked) `/testing-tree` api endpoint
 * @returns Promise containing a ui tree to use as initial state for app
 */
export async function getClientsideOnlyTree() {
  return new Promise<ShinyUiNode>((resolve) => {
    if (!TESTING_MODE) {
      // If we're just running in clientside only mode, immediately resolve the
      // promise with a simple grid page
      resolve(sampleAppTree);
      return;
    }
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
        console.error("/testing-tree error", e);
        resolve(testingUiTree);
      });
  });
}
