import {
  is_assignment_node,
  is_ast_branch_node,
  is_ast_leaf_node,
  is_output_node,
} from "./node_identity_checkers";
import type { R_AST, R_AST_Node, Script_Position } from "./r_ast";

type Variable_Assignment = {
  name: string;
  is_output: boolean;
  node: R_AST_Node;
};

export function find_assignment_nodes(ast: R_AST): Variable_Assignment[] {
  let assignment_nodes: Variable_Assignment[] = [];

  ast.forEach((node) => {
    if (is_assignment_node(node)) {
      const assignment_name = node.val[1];

      let name: string;
      let is_output: boolean;

      if (is_ast_leaf_node(assignment_name)) {
        name = String(assignment_name.val);
        is_output = false;
      } else if (is_output_node(assignment_name)) {
        name = assignment_name.val[2].val;
        is_output = true;
      } else {
        // Unknown assignment type
        return;
      }

      assignment_nodes.push({
        name,
        is_output,
        node,
      });
    }

    if (is_ast_branch_node(node)) {
      const sub_assignments = find_assignment_nodes(node.val);
      assignment_nodes.push(...sub_assignments);
    }
  });

  return assignment_nodes;
}

export function find_output_positions(ast: R_AST) {
  return find_assignment_nodes(ast)
    .filter(({ is_output }) => is_output)
    .reduce((by_name, { name, node }) => {
      const { pos } = node;
      if (pos) {
        by_name[name] = [...(by_name[name] ?? []), pos];
      }

      return by_name;
    }, {} as Record<string, Script_Position[]>);
}
