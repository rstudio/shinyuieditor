import type { Script_Position } from "communication-types/src/MessageToBackend";

import type { ParserTree } from ".";

import type { Server_Position_Map } from "./get_known_inputs";
import { get_node_position } from "./get_node_position";

/**
 * Grab all known outputs in the PyShiny app
 * @param app_tree A tree-sitter tree of the whole app script
 * @returns Mapping of the output's `id` its position in app script
 */
export function get_known_outputs(app_tree: ParserTree): Server_Position_Map {
  const outputs = new Map<string, Script_Position[]>();

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
    const output_id = fn_def.firstNamedChild?.text;

    if (!output_id) return;

    const position = get_node_position(decorated_def);

    const existing_entry = outputs.get(output_id);

    if (!existing_entry) {
      outputs.set(output_id, [position]);
    } else {
      existing_entry.push(position);
    }
  });

  return outputs;
}
