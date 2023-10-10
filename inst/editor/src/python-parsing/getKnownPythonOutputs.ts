import type { ParserNode } from "treesitter-parsers";

import type { IdToNodeMap } from "../parsing/nodesToLocations";

/**
 * Grab all known outputs in the PyShiny app as a map of ID to tree-sitter node
 * @param app_tree A tree-sitter tree of the whole app script
 * @returns Mapping of the output's id to the tree-sitter node
 */
export function getKnownPythonOutputNodes(serverNode: ParserNode): IdToNodeMap {
  const outputNodesMap: IdToNodeMap = new Map();

  // Get all the nodes that represent decorated functions in the script
  const decorated_fns = serverNode.descendantsOfType("decorated_definition");

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

    const existing_entry = outputNodesMap.get(output_id);

    if (!existing_entry) {
      outputNodesMap.set(output_id, [decorated_def]);
    } else {
      existing_entry.push(decorated_def);
    }
  });

  return outputNodesMap;
}
