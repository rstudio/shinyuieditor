import type { ParserNode } from "treesitter-parsers";
import { extract_call_content, is_call_node } from "treesitter-parsers";
import { make_unknown_ui_function } from "ui-node-definitions/src/make_unknown_ui_function";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";
import { pyFnNameToNodeInfo } from "ui-node-definitions/src/uiNodeTypes";

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

export function treesitter_to_ui_tree(node: ParserNode): ShinyUiNode {
  if (!is_call_node(node)) {
    return make_unknown_ui_function(node.text);
  }

  const { fn_name, fn_args } = extract_call_content(node);

  const known_info = pyFnNameToNodeInfo.get(fn_name);
  if (!known_info) {
    return make_unknown_ui_function(node.text);
  }

  const positional_args = [...known_info.ordered_positional_args];
  const num_of_positional_args = positional_args.length;

  const named_arg_names = Object.keys(known_info.settingsInfo);

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

    if (is_keyword_arg_node(arg)) {
      const kwarg = parse_keyword_arg_node(arg);

      let sue_arg_name = known_info.py_arg_name_to_sue_arg_name.get(kwarg.name);

      // If there isn't a argument name mapping that was explicitly defined in
      // the node info, then we need to see if we're working with the id
      // argument. If we have an ID argument and the node is an input or output,
      // then swap it. This is because pyShiny uses just plain `id` for input
      // and output ids as opposed to R which uses `inputId` or `outputId`. By
      // detecting this we avoid needing to manually specify it in every node's
      // definition
      if (!sue_arg_name && kwarg.name === "id") {
        if ("inputId" in known_info.settingsInfo) {
          sue_arg_name = "inputId";
        } else if ("outputId" in known_info.settingsInfo) {
          sue_arg_name = "outputId";
        }
      }

      parsed_node.namedArgs[sue_arg_name ?? kwarg.name] = parse_arg_node(
        kwarg.value
      );
      continue;
    }

    if (known_info.takesChildren) {
      // Must be a child node, so add it to the children array. This may be an
      // issue with simple nodes like strings that can be children
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

  return treesitter_to_ui_tree(node);
}