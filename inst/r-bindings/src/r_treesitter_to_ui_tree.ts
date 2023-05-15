import type { ParserNode } from "treesitter-parsers";
import { extract_call_content, is_call_node } from "treesitter-parsers";
import { make_unknown_ui_function } from "ui-node-definitions/src/make_unknown_ui_function";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";
import { rFnNameToNodeInfo } from "ui-node-definitions/src/uiNodeTypes";
import { inANotInB } from "util-functions/src/arrays";

import { extract_array_contents, is_array_node } from "./NodeTypes/ArrayNode";
import {
  extract_boolean_content,
  is_boolean_node,
} from "./NodeTypes/BooleanNode";
import {
  is_keyword_arg_node,
  parse_keyword_arg_node,
} from "./NodeTypes/KeywordArgNode";
import { extract_number_content, is_number_node } from "./NodeTypes/NumberNode";
import { extract_string_content, is_string_node } from "./NodeTypes/StringNode";
import { is_text_node, parse_text_node } from "./NodeTypes/TextNode";

export function r_treesitter_to_ui_tree(node: ParserNode): ShinyUiNode {
  if (is_text_node(node)) {
    return parse_text_node(node);
  }

  if (!is_call_node(node)) {
    return make_unknown_ui_function(node.text);
  }

  const { fn_name, fn_args } = extract_call_content(node);

  const known_info = rFnNameToNodeInfo(fn_name);
  if (!known_info) {
    return make_unknown_ui_function(node.text);
  }

  const parsed_node: ShinyUiNode = {
    id: known_info.id,
    namedArgs: {},
  };

  // Make children a second variable in case it's not needed
  let children_nodes: ShinyUiNode[] = [];

  const named_arg_nodes = fn_args.filter(is_keyword_arg_node);

  const arg_preprocessor =
    "preprocess_raw_ast_arg" in known_info.r_info
      ? known_info.r_info.preprocess_raw_ast_arg
      : (_: unknown) => null;

  named_arg_nodes.forEach((arg) => {
    const kwarg = parse_keyword_arg_node(arg);
    const sue_arg_name =
      known_info.r_arg_name_to_sue_arg_name.get(kwarg.name) ?? kwarg.name;

    // If we have a preprocessor for this argument, use that to build the parsed
    // argument
    const preprocessed = arg_preprocessor(kwarg);
    if (preprocessed) {
      parsed_node.namedArgs[preprocessed.name] = preprocessed.value;
      return;
    }

    // If we're dealing with a ui-node argument, then run the full parser on it
    if (known_info.get_arg_info(sue_arg_name)?.inputType === "ui-node") {
      parsed_node.namedArgs[sue_arg_name] = r_treesitter_to_ui_tree(
        kwarg.value
      );
      return;
    }

    // ...otherwise we just parse the argument as normal
    parsed_node.namedArgs[sue_arg_name] = parse_arg_node(kwarg.value);
  });

  const missing_required_args = inANotInB(
    known_info.required_arg_names,
    Object.keys(parsed_node.namedArgs)
  );

  fn_args
    .filter((arg) => !is_keyword_arg_node(arg))
    .forEach((node) => {
      if (missing_required_args.length > 0) {
        // If we have missing required args, we need to fill them in first.
        const missing_arg_name = missing_required_args.shift()!;

        parsed_node.namedArgs[missing_arg_name] = parse_arg_node(node);

        return;
      }

      children_nodes.push(r_treesitter_to_ui_tree(node));
    });

  // throw new Error(
  //   `Error trying to parse node ${fn_name}.\n` +
  //     `More positional arguments provided than expected. ` +
  //     `To use the Ui Editor with your app make sure to type ` +
  //     `out the names of parameters you're using if they are ` +
  //     `not child nodes.\nFull call:\n${node.text}`
  // );

  if (children_nodes.length > 0) {
    return {
      ...parsed_node,
      children: children_nodes,
    };
  }

  return parsed_node;
}

function parse_arg_node(node: ParserNode) {
  if (is_string_node(node)) {
    return extract_string_content(node);
  }

  if (is_number_node(node)) {
    return extract_number_content(node);
  }

  if (is_boolean_node(node)) {
    return extract_boolean_content(node);
  }

  if (is_array_node(node)) {
    return extract_array_contents(node);
  }

  return r_treesitter_to_ui_tree(node);
}
