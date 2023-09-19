/// <reference types="web-tree-sitter" />
import type { Node_Assignment_Map } from ".";
/**
 *
 * @param assignment_map Map of all assignment nodes in the script as given by
 * `find_assignment_nodes()`
 * @param ui_node_name Name of the variable we're looking for that contains the
 * UI definition. Defaults to `app_ui`.
 * @returns The node containing the UI definition, `null` if not found
 * @throws Error if the UI node is not found
 */
export declare function get_ui_assignment(assignment_map: Node_Assignment_Map, ui_node_name?: string): import("web-tree-sitter").SyntaxNode;
