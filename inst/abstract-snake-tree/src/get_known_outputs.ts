import type { Script_Position } from "communication-types/src/MessageToBackend";
import type Parser from "web-tree-sitter";

import { get_node_position } from "./get_node_position";

/**
 * Grab all known outputs in the PyShiny app
 * @param app_tree A tree-sitter tree of the whole app script
 * @returns Mapping of the output's `id` its position in app script
 */
export function get_known_outputs(
  app_tree: Parser.Tree
): Map<string, Script_Position> {
  const outputs = new Map<string, Script_Position>();

  // Get all the nodes that represent decorated functions in the script
  const decorated_fns = app_tree.rootNode.descendantsOfType(
    "decorated_definition"
  );

  decorated_fns.forEach((decorated_def) => {
    // First we need to ensure we're getting an output function by checking if
    // one of the decorators is `@output`
    const has_output_decorator = decorated_def
      .descendantsOfType("decorator")
      .some((decorator) => decorator.firstNamedChild?.text === "output");

    if (!has_output_decorator) return;

    // Now that we know we're working with an output decorator, go into the
    // function definition and grab the function name to get the associated id
    const fn_def = decorated_def.descendantsOfType("function_definition")[0];
    const name_of_wrapped_fn = fn_def.firstNamedChild?.text;

    if (!name_of_wrapped_fn) return;

    // Now that we're sure we have an output definition and its name, grab the
    // location and add to our map
    outputs.set(name_of_wrapped_fn, get_node_position(decorated_def));
  });

  return outputs;
}
