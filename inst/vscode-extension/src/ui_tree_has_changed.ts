import compare from "just-compare";

import type { App_Parser } from "./App_Parser";

export type Parsed_App_Info = Awaited<ReturnType<App_Parser["getInfo"]>>;
/**
 * Check if info pertaining the the apps UI has changed since the last time it
 * was parsed. This avoids re-writing changes etc if the user has just updated
 * whitespace etc..
 * @param prev_info Info from the previous time the app script was parsed. May
 * be undefined if the app has yet to be parsed
 * @param updated_info Info from the current time the app script was parsed
 * @returns Whether the app has changed since the last time it was parsed in a
 * way meaningful to the UI editor state.
 */
export function ui_tree_has_changed(
  prev_info: Parsed_App_Info | undefined,
  updated_info: Parsed_App_Info
): boolean {
  if (prev_info === undefined) {
    return true;
  }

  if (updated_info.status === "error") {
    // Something has gone wrong with the parser so throw an error.
    throw new Error(updated_info.errorMsg);
  }

  if (prev_info.status === "error") {
    // Something has gone wrong with the parser so throw an error.
    throw new Error(prev_info.errorMsg);
  }

  // Compare the two trees
  if (updated_info.values === "EMPTY" && prev_info.values === "EMPTY") {
    // Both are empty so no change
    return false;
  }

  // One of the two is empty means we have a change
  if (updated_info.values === "EMPTY" || prev_info.values === "EMPTY") {
    return true;
  }

  return !compare(prev_info.values.ui.ui_tree, updated_info.values.ui.ui_tree);
}
