import type {
  Branch_Node,
  Expression_Node,
  R_AST,
  R_AST_Node,
  Script_Position,
  Symbol_Node,
} from ".";

import { is_ast_branch_node } from "./node_identity_checkers";
import { Parsing_Error } from "./parsing_error_class";

export type Assignment_Operator = "<-" | "=";

type Output_Node = Expression_Node<
  [
    { val: "$"; type: "s" },
    { val: "output"; type: "s" },
    { val: string; type: "s" }
  ]
>;

type Assignment_Node_Gen<
  VALUE extends R_AST_Node,
  NAME extends R_AST_Node = R_AST_Node
> = Expression_Node<
  [assignment: Symbol_Node<Assignment_Operator>, name: NAME, value: VALUE]
>;

export type Assignment_Node = Assignment_Node_Gen<R_AST_Node>;

function is_assignment_node(
  node: R_AST_Node,
  var_name?: string
): node is Assignment_Node {
  if (!is_ast_branch_node(node)) return false;

  const { val } = node;

  const is_assignment = val[0].val === "<-" || val[0].val === "=";

  if (!is_assignment) return false;

  return var_name ? val[1].val === var_name : true;
}

export function get_assignment_lhs<Node extends Assignment_Node>(
  node: Node
): Node["val"][1] {
  return node.val[1];
}

export function get_assignment_rhs<Node extends Assignment_Node>(
  node: Node
): Node["val"][2] {
  return node.val[2];
}

export type Variable_Assignment = {
  name: string;
  is_output: boolean;
  node: Assignment_Node;
};

export function get_assignment_nodes(ast: R_AST): Variable_Assignment[] {
  let assignment_nodes: Variable_Assignment[] = [];

  ast.forEach((node) => {
    if (is_assignment_node(node)) {
      const assigned_name = get_assignment_lhs(node);

      if (is_output_node(assigned_name)) {
        assignment_nodes.push({
          name: assigned_name.val[2].val,
          is_output: true,
          node,
        });
      } else if (assigned_name.type === "s") {
        assignment_nodes.push({
          name: assigned_name.val,
          is_output: false,
          node,
        });
      } else {
        // Some other type of assignment we don't really care about. E.g.
        // foo["bar"] <- ...
      }
    }

    if (is_ast_branch_node(node)) {
      const sub_assignments = get_assignment_nodes(node.val);
      assignment_nodes.push(...sub_assignments);
    }
  });

  return assignment_nodes;
}

function is_output_node(node: R_AST_Node): node is Output_Node {
  if (!is_ast_branch_node(node)) return false;
  const { val: subnodes } = node;

  return (
    subnodes.length === 3 &&
    subnodes[1].val === "output" &&
    typeof subnodes[2].val === "string"
  );
}

export type Output_Server_Pos = Record<string, Script_Position[]>;
export function get_output_positions(
  all_asignments: Variable_Assignment[]
): Output_Server_Pos {
  return all_asignments
    .filter(({ is_output }) => is_output)
    .reduce((by_name, { name, node }) => {
      const { pos } = node;
      if (pos) {
        by_name[name] = [...(by_name[name] ?? []), pos];
      }

      return by_name;
    }, {} as Output_Server_Pos);
}

export type Ui_Assignment_Node = Required<
  Assignment_Node_Gen<Branch_Node, Symbol_Node<"ui">>
>;

function is_ui_assignment_node(
  node: Assignment_Node
): node is Ui_Assignment_Node {
  const has_position = Boolean(node.pos);
  if (!has_position) return false;

  const assigns_to_ui = get_assignment_lhs(node).val === "ui";
  if (!assigns_to_ui) return false;

  return is_ast_branch_node(get_assignment_rhs(node));
}

export function get_ui_assignment_node(
  all_asignments: Variable_Assignment[]
): Ui_Assignment_Node {
  const ui_assignment = all_asignments.find(
    ({ name, is_output }) => name === "ui" && !is_output
  );

  if (!ui_assignment) {
    throw new Parsing_Error({
      message: "No ui assignment node was found in provided ast",
    });
  }

  const { node: ui_node } = ui_assignment;

  if (!is_ui_assignment_node(ui_node)) {
    throw new Parsing_Error({
      message: "No position info attached to the ui assignment node",
      cause: ui_node,
    });
  }

  return ui_node;
}

export type Server_Assignment_Node = Required<
  Assignment_Node_Gen<Branch_Node, Symbol_Node<"server">>
>;
export function get_server_assignment_node(
  all_asignments: Variable_Assignment[]
): Server_Assignment_Node {
  const server_assignment = all_asignments.find(
    ({ name, is_output }) => name === "server" && !is_output
  );

  if (!server_assignment) {
    throw new Parsing_Error({
      message: "No server assignment node was found in provided ast",
    });
  }

  const { node: server } = server_assignment;

  if (!server.pos) {
    throw new Parsing_Error({
      message: "No position info attached to the ui assignment node",
      cause: server,
    });
  }

  return server as Server_Assignment_Node;
}
