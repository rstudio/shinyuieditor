import { ast_to_ui_node } from "./ast_to_shiny_ui_node";
import {
  get_assignment_nodes,
  get_output_positions,
  get_ui_assignment_node,
} from "./get_assignment_nodes";
import type { R_AST } from "./r_ast";

export function parse_app_ast(ast: R_AST) {
  const assignment_nodes = get_assignment_nodes(ast);
  const ui_node = get_ui_assignment_node(assignment_nodes);
  const output_positions = get_output_positions(assignment_nodes);

  return {
    ui_tree: ast_to_ui_node(ui_node.val[2], output_positions),
    ui_pos: ui_node.pos,
    ui_assignment_operator: ui_node.val[0].val,
  };
}
