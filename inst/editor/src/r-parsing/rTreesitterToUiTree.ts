import type { ParserNode } from "treesitter-parsers";
import { inANotInB } from "util-functions/src/arrays";

import { makeUnknownUiFunction } from "../ui-node-definitions/make_unknown_ui_function";
import type { ShinyUiNode } from "../ui-node-definitions/ShinyUiNode";

import { getRInfoIfKnown } from "./get_r_info_if_known";
import { extract_array_contents, is_array_node } from "./NodeTypes/ArrayNode";
import {
  extract_boolean_content,
  is_boolean_node,
} from "./NodeTypes/BooleanNode";
import {
  is_keyword_arg_node,
  parse_keyword_arg_node,
} from "./NodeTypes/KeywordArgNode";
import { extractListContents, isListNode } from "./NodeTypes/ListNode";
import { extract_number_content, is_number_node } from "./NodeTypes/NumberNode";
import { extract_string_content, is_string_node } from "./NodeTypes/StringNode";
import { is_text_node, parse_text_node } from "./NodeTypes/TextNode";

export function rTreesitterToUiTree(node: ParserNode): ShinyUiNode {
  if (is_text_node(node)) {
    return parse_text_node(node);
  }

  const r_fn_info = getRInfoIfKnown(node);

  if (r_fn_info === null) {
    return makeUnknownUiFunction(node.text);
  }

  const { fn_args, info } = r_fn_info;

  if (!info) {
    return makeUnknownUiFunction(node.text);
  }

  const parsed_node: ShinyUiNode = {
    id: info.id,
    namedArgs: {},
  };

  // Make children a second variable in case it's not needed
  let children_nodes: ShinyUiNode[] = [];

  const named_arg_nodes = fn_args.filter(is_keyword_arg_node);

  const arg_preprocessor =
    "preprocess_raw_ast_arg" in info.r_info
      ? info.r_info.preprocess_raw_ast_arg
      : (_: unknown) => null;

  named_arg_nodes.forEach((arg) => {
    const kwarg = parse_keyword_arg_node(arg);
    const sue_arg_name =
      info.r_arg_name_to_sue_arg_name.get(kwarg.name) ?? kwarg.name;

    // If we have a preprocessor for this argument, use that to build the parsed
    // argument
    if (arg_preprocessor) {
      const preprocessed = arg_preprocessor(kwarg);
      if (preprocessed) {
        parsed_node.namedArgs[preprocessed.name] = preprocessed.value;
        return;
      }
    }

    // If we're dealing with a ui-node argument, then run the full parser on it
    if (info.get_arg_info(sue_arg_name)?.inputType === "ui-node") {
      parsed_node.namedArgs[sue_arg_name] = rTreesitterToUiTree(kwarg.value);
      return;
    }

    // ...otherwise we just parse the argument as normal
    parsed_node.namedArgs[sue_arg_name] = parseArgNode(kwarg.value);
  });

  const missing_required_args = inANotInB(
    info.required_arg_names,
    Object.keys(parsed_node.namedArgs)
  );

  fn_args
    .filter((arg) => !is_keyword_arg_node(arg))
    .forEach((node) => {
      if (missing_required_args.length > 0) {
        // If we have missing required args, we need to fill them in first.
        const missing_arg_name = missing_required_args.shift()!;

        parsed_node.namedArgs[missing_arg_name] = parseArgNode(node);

        return;
      }

      children_nodes.push(rTreesitterToUiTree(node));
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

function parseArgNode(node: ParserNode) {
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

  if (isListNode(node)) {
    return extractListContents(node);
  }

  return rTreesitterToUiTree(node);
}
