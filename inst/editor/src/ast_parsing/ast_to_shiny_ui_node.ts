import type {
  namedArgsObject,
  ShinyUiNode,
} from "editor/src/Shiny-Ui-Elements/uiNodeTypes";
import {
  getUiNodeInfo,
  rFnNameToNodeId,
} from "editor/src/Shiny-Ui-Elements/uiNodeTypes";
import type { Branch_Node, R_AST_Node } from "r-ast-parsing";
import {
  is_function_node,
  is_primative_node,
  IsNodeOfType,
} from "r-ast-parsing/src/node_identity_checkers";
import { identify_fn } from "util-functions/src/TypescriptUtils";

import type { StaticInputOptions } from "../components/Inputs/SettingsFormBuilder/inputFieldTypes";

import { print_node_val } from "./code_generation/build_function_text";
import { create_unknownUiFunction } from "./create_unknownUiFunction";
import {
  flatten_to_array,
  flatten_to_list,
  get_node_is_array,
  get_node_is_list,
} from "./flatten_arrays_and_lists";
import { build_text_node } from "./text_nodes/build_text_node";
import { is_text_node } from "./text_nodes/is_text_node";

export function ast_to_ui_node(node: Branch_Node): ShinyUiNode {
  const [fn_name, ...args] = node.val;

  if (typeof fn_name.val !== "string") {
    return create_unknownUiFunction({ node });
  }

  const node_normalized_name = rFnNameToNodeId.get(fn_name.val);

  if (node_normalized_name === undefined) {
    return create_unknownUiFunction({ node });
  }

  // If the node has a ast argument preprocessor, use that to process the
  // arguments first. Otherwise we just pass them through untouched
  const node_info = getUiNodeInfo(node_normalized_name);
  const pre_process_node =
    "r_info" in node_info && "preprocess_raw_ast_arg" in node_info.r_info
      ? node_info.r_info.preprocess_raw_ast_arg
      : identify_fn;

  const argument_nodes = args.map(pre_process_node);

  const namedArgs: namedArgsObject = Object.fromEntries(
    argument_nodes
      .filter((sub_node) => sub_node.name) // filter out unnamed nodes
      .map((sub_node) => {
        const arg_name = sub_node.name!;

        // Check to see if we need to process the argument as a ui node or not
        const arg_info = node_info.settingsInfo[
          arg_name as keyof typeof node_info.settingsInfo
        ] as StaticInputOptions | undefined;

        return [
          arg_name,
          arg_info && arg_info.inputType === "ui-node"
            ? process_child_arg(sub_node)
            : process_named_arg(sub_node),
        ];
      })
  );

  const children = argument_nodes
    .filter((sub_node) => !sub_node.name)
    .map(process_child_arg);

  return {
    id: node_normalized_name,
    namedArgs,
    ...(children.length > 0 ? { children } : {}),
  };
}

function process_named_arg(node: R_AST_Node) {
  if (is_primative_node(node)) {
    return node.val;
  }

  if (get_node_is_array(node)) {
    return flatten_to_array(node);
  }

  if (get_node_is_list(node)) {
    return flatten_to_list(node);
  }

  return create_unknownUiFunction({ node });
}

function process_child_arg(node: R_AST_Node): ShinyUiNode {
  if (IsNodeOfType(node, "symbol")) {
    return create_unknownUiFunction({ node, explanation: "Unknown symbol" });
  }

  if (is_text_node(node)) {
    return build_text_node(node);
  }

  if (is_function_node(node)) {
    return ast_to_ui_node(node);
  }

  // Here we have a primative value that's not text, so we just coerce it to
  // plain text. Doesn't seem great but the output of the ui will be the same as
  // this is what the tags do anyways
  return build_text_node(print_node_val(node));
}
