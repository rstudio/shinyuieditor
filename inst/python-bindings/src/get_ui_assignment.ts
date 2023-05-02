import type { Node_Assignment_Map } from "./get_assignment_nodes";

/**
 *
 * @param assignment_map Map of all assignment nodes in the script as given by
 * `find_assignment_nodes()`
 * @param ui_node_name Name of the variable we're looking for that contains the
 * UI definition. Defaults to `app_ui`.
 * @returns The node containing the UI definition, `null` if not found
 * @throws Error if the UI node is not found
 */
export function get_ui_assignment(
  assignment_map: Node_Assignment_Map,
  ui_node_name: string = "app_ui"
) {
  const ui_node = assignment_map.get(ui_node_name);
  if (ui_node) {
    return ui_node;
  }
  return null;
}
