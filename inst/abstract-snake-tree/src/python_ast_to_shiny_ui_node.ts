import { make_unknown_ui_function } from "ui-node-definitions/src/make_unknown_ui_function";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";
import { pyFnNameToNodeInfo } from "ui-node-definitions/src/uiNodeTypes";

import type {
  Parsed_Ui_Node,
  Parsed_Nodes_By_Type,
} from "./NodeTypes/Parsed_Ui_Node";

// export function python_ast_to_shiny_ui_node(
//   py_ast: Parsed_Ui_Node
// ): ShinyUiNode {
//   const node_type = py_ast.type;

//   switch (node_type) {
//     case "call":
//       return;
//     case "string":
//       return;
//     case "number":
//       return;
//     case "boolean":
//       return;
//     case "unknown":
//       return make_unknown_ui_function(py_ast.text);
//     default:
//       return;
//   }
// }

// function fill_out_python_call(call_node: Parsed_Nodes_By_Type["call"]) {
//   const { fn_name, args } = call_node;

//   const parsed_args = args.map((arg) => python_ast_to_shiny_ui_node(arg));

//   const known_node_info = pyFnNameToNodeInfo.get(fn_name);

//   if (known_node_info) {
//     // We know this node
//     const { id, py_info, ordered_positional_args } = known_node_info;
//   }

//   return make_unknown_ui_function(fn_name);
// }
