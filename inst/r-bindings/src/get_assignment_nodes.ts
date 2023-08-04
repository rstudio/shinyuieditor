import type { AppInfo } from "communication-types/src/AppInfo";
import type { ScriptRange } from "communication-types/src/MessageToBackend";

import type { BranchNode, ExpressionNode, RAST, RASTNode, SymbolNode } from ".";
import { posToScriptRange } from ".";

import { isAstBranchNode } from "./node_identity_checkers";
import { ParsingError } from "./parsing_error_class";

type AssignmentOperator = "<-" | "=";

type OutputNode = ExpressionNode<
  [
    { val: "$"; type: "s" },
    { val: "output"; type: "s" },
    { val: string; type: "s" }
  ]
>;

type AssignmentNodeGen<
  VALUE extends RASTNode,
  NAME extends RASTNode = RASTNode
> = ExpressionNode<
  [assignment: SymbolNode<AssignmentOperator>, name: NAME, value: VALUE]
>;

type AssignmentNode = AssignmentNodeGen<RASTNode>;

function isAssignmentNode(
  node: RASTNode,
  var_name?: string
): node is AssignmentNode {
  if (!isAstBranchNode(node)) return false;

  const { val } = node;

  const is_assignment = val[0].val === "<-" || val[0].val === "=";

  if (!is_assignment) return false;

  return var_name ? val[1].val === var_name : true;
}

function getAssignmentLhs<Node extends AssignmentNode>(
  node: Node
): Node["val"][1] {
  return node.val[1];
}

type VariableAssignment = {
  name: string;
  is_output: boolean;
  node: AssignmentNode;
};

export function getAssignmentNodes(ast: RAST): VariableAssignment[] {
  let assignment_nodes: VariableAssignment[] = [];

  ast.forEach((node) => {
    if (isAssignmentNode(node)) {
      const assigned_name = getAssignmentLhs(node);

      if (isOutputNode(assigned_name)) {
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

    if (isAstBranchNode(node)) {
      const sub_assignments = getAssignmentNodes(node.val);
      assignment_nodes.push(...sub_assignments);
    }
  });

  return assignment_nodes;
}

function isOutputNode(node: RASTNode): node is OutputNode {
  if (!isAstBranchNode(node)) return false;
  const { val: subnodes } = node;

  return (
    subnodes.length === 3 &&
    subnodes[1].val === "output" &&
    typeof subnodes[2].val === "string"
  );
}

export function getOutputPositions(
  all_asignments: VariableAssignment[]
): Map<string, ScriptRange[]> {
  return all_asignments
    .filter(({ is_output }) => is_output)
    .reduce((by_name, { name, node }) => {
      const { pos } = node;
      if (pos) {
        const existing = by_name.get(name);

        const range = posToScriptRange(pos);

        if (existing) {
          existing.push(range);
        } else {
          by_name.set(name, [range]);
        }
      }

      return by_name;
    }, new Map<string, ScriptRange[]>());
}

export function getKnownOutputs(
  all_asignments: VariableAssignment[]
): AppInfo["known_outputs"] {
  const output_nodes = all_asignments.filter(({ is_output }) => is_output);

  const known_names = new Set<string>();
  output_nodes.forEach(({ name }) => {
    known_names.add(name);
  });
  return [...known_names];
}

type ServerAssignmentNode = Required<
  AssignmentNodeGen<BranchNode, SymbolNode<"server">>
>;
export function getServerAssignmentNode(
  all_asignments: VariableAssignment[]
): ServerAssignmentNode {
  const server_assignment = all_asignments.find(
    ({ name, is_output }) => name === "server" && !is_output
  );

  if (!server_assignment) {
    throw new ParsingError({
      message: "No server assignment node was found in provided ast",
    });
  }

  const { node: server } = server_assignment;

  if (!server.pos) {
    throw new ParsingError({
      message: "No position info attached to the ui assignment node",
      cause: server,
    });
  }

  return server as ServerAssignmentNode;
}
