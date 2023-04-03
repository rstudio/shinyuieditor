import type { ShinyUiNode } from "editor";
import type { UiArgumentsObject } from "editor/src/Shiny-Ui-Elements/uiNodeTypes";
import { getUiNodeInfo } from "editor/src/Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNameToNamespacedName } from "editor/src/Shiny-Ui-Elements/uiNodeTypes";
import type { Branch_Node, Function_Node, R_AST_Node } from "r-ast-parsing";
import {
  IsNodeOfType,
  is_function_node,
  is_primative_node,
} from "r-ast-parsing/src/node_identity_checkers";
import { identify_fn } from "util-functions/src/TypescriptUtils";

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

  const node_normalized_name = shinyUiNameToNamespacedName.get(fn_name.val);

  if (node_normalized_name === undefined) {
    return create_unknownUiFunction({ node });
  }

  // If the node has a ast argument preprocessor, use that to process the
  // arguments first. Otherwise we just pass them through untouched
  const pre_process_node =
    getUiNodeInfo(node_normalized_name).preprocess_ast_arg ?? identify_fn;

  const argument_nodes = args.map(pre_process_node);

  const uiArguments: UiArgumentsObject = Object.fromEntries(
    argument_nodes
      .filter((sub_node) => sub_node.name)
      .map((sub_node) => {
        return [sub_node.name!, process_named_arg(sub_node)];
      })
  );

  const uiChildren = argument_nodes
    .filter((sub_node) => !sub_node.name)
    .map(process_child_arg);

  return {
    uiName: node_normalized_name,
    uiArguments,
    ...(uiChildren.length > 0 ? { uiChildren } : {}),
  };
}

/**
 * Is the passed function call a call to one of the ui functions the editor is
 * aware of?
 * @param node An ast node that represents a function call
 * @returns Boolean indicating if the function call is a known shiny ui function
 */
function is_known_ui_node(node: Function_Node): boolean {
  const name_of_called_fn = node.val[0].val;

  const node_normalized_name =
    shinyUiNameToNamespacedName.get(name_of_called_fn);

  return node_normalized_name !== undefined;
}

function process_named_arg(node: R_AST_Node) {
  if (is_function_node(node)) {
    if (is_known_ui_node(node)) {
      return ast_to_ui_node(node);
    }
    if (get_node_is_array(node)) {
      return flatten_to_array(node);
    }

    if (get_node_is_list(node)) {
      return flatten_to_list(node);
    }
  }

  if (is_primative_node(node)) {
    return node.val;
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
