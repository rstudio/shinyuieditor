import type { ParserNode } from "treesitter-parsers";

import type { IdToNodeMap } from "../parsing/nodesToLocations";

/**
 * Get a mapping of all known inputs in the app script to their tree-sitter nodes
 * @param app_tree Parsed app script as returned by `parse_python_script()`
 * @returns A map of the input's `id` to the positions it appears in the app script
 */
export function getKnownPythonInputNodes(serverNode: ParserNode): IdToNodeMap {
  const inputNodesMap: IdToNodeMap = new Map();

  serverNode.descendantsOfType("attribute").forEach((node) => {
    const { firstNamedChild, lastNamedChild } = node;

    if (
      !firstNamedChild ||
      !lastNamedChild ||
      firstNamedChild.text !== "input"
    ) {
      return;
    }

    const input_id = lastNamedChild.text;

    // Go up one level to get the call to this input so we can get an accurate position
    const input_call = node.parent;
    if (!input_call || input_call.type !== "call") {
      return;
    }

    const existing_entry = inputNodesMap.get(input_id);

    if (!existing_entry) {
      inputNodesMap.set(input_id, [input_call]);
    } else {
      existing_entry.push(input_call);
    }
  });

  return inputNodesMap;
}
