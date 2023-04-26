import { make_unknown_ui_function } from "ui-node-definitions/src/make_unknown_ui_function";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";
import { pyFnNameToNodeInfo } from "ui-node-definitions/src/uiNodeTypes";
import type Parser from "web-tree-sitter";

import { extract_boolean_content, is_boolean_node } from "./BooleanNode";
import { extract_number_content, is_number_node } from "./NumberNode";
import { extract_string_content, is_string_node } from "./StringNode";

export function treesitter_to_ui_tree(node: Parser.SyntaxNode): ShinyUiNode {
  if (node.type !== "call") {
    throw new Error("Node is not a call node");
  }
  const fn_name = node.child(0)?.text;
  const fn_args = node.child(1)?.namedChildren;

  if (!fn_name || !fn_args) {
    throw new Error("Call node is missing a function name or args");
  }
  // const fn_name = node.functionNode.text;
  const known_info = pyFnNameToNodeInfo.get(fn_name);
  if (!known_info) {
    return make_unknown_ui_function(node.text);
  }

  // const fn_args = node.argumentsNode.namedChildren;

  const positional_args = [...known_info.ordered_positional_args];
  const num_of_positional_args = positional_args.length;

  const named_arg_names = Object.keys(known_info.settingsInfo);

  // TODO add this to preprocessing
  const py_arg_name_to_sue_arg_name = new Map<string, string>();
  for (const [arg_name, arg_info] of Object.entries(known_info.settingsInfo)) {
    if (arg_info.py_name) {
      py_arg_name_to_sue_arg_name.set(arg_info.py_name, arg_name);
    }
  }

  const parsed_node: ShinyUiNode = {
    id: known_info.id,
    namedArgs: {},
  };
  // Make children a second variable in case it's not needed
  let children_nodes: ShinyUiNode[] = [];

  // Run through all the args and add them to the appropriate place
  for (let i = 0; i < fn_args.length; i++) {
    const arg = fn_args[i];

    if (i < num_of_positional_args) {
      // This is a positional argument so we need to gather it into the named
      // args
      parsed_node.namedArgs[positional_args[i]] = parse_arg_node(arg);
      continue;
    }

    if (arg.type === "keyword_argument") {
      const { arg_name, arg_value } = parse_kwarg_node(arg);

      parsed_node.namedArgs[arg_name] = parse_arg_node(arg_value);
      continue;
    }

    if (known_info.takesChildren) {
      // Must be a child node, so add it to the children array
      children_nodes.push(treesitter_to_ui_tree(arg));
      continue;
    }

    // This must be a situation where a node with all named args has passed
    // those named arguments as positional
    const arg_name = named_arg_names[i];
    if (arg_name) {
      // TODO: Check to make sure the type matches what we are supposed to get
      parsed_node.namedArgs[arg_name] = parse_arg_node(arg);
      continue;
    }

    // If we don't know what this argument is, then assume we're in the scenario
    // where the user has passed all named arguments as positional arguments and
    // we just havent added knowledge of all the args for the node. We can't
    // work in this scenario because if the user adds or removes an optional
    // parameter in the editor then the positions will get all messed up.
    throw new Error(
      `Error trying to parse node ${fn_name}.\n` +
        `More positional arguments provided than expected. ` +
        `To use the Ui Editor with your app make sure to type ` +
        `out the names of parameters you're using if they are ` +
        `not child nodes.\nFull call:\n${node.text}`
    );
  }

  if (children_nodes.length > 0) {
    return {
      ...parsed_node,
      children: children_nodes,
    };
  }

  return parsed_node;
}

function parse_arg_node(node: Parser.SyntaxNode) {
  if (is_string_node(node)) {
    return extract_string_content(node);
  }

  if (is_number_node(node)) {
    return extract_number_content(node);
  }

  if (is_boolean_node(node)) {
    debugger;
    return extract_boolean_content(node);
  }

  if (node.type === "call") {
    return treesitter_to_ui_tree(node);
  }

  return make_unknown_ui_function(node.text);
}

function parse_kwarg_node(node: Parser.SyntaxNode) {
  const arg_name = node.child(0)?.text;
  const arg_value = node.child(1);
  if (!arg_name || !arg_value) {
    throw new Error("Keyword argument node is missing a name or value");
  }

  return {
    arg_name,
    arg_value,
  };
}
