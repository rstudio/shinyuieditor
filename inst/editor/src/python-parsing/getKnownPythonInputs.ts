import type { ServerPositionMap } from "communication-types/src/MessageToBackend";
import type { ParserNode } from "treesitter-parsers";
import { getNodePosition } from "treesitter-parsers";

/**
 * Get a mapping of all known inputs in the app script to output positions
 * @param app_tree Parsed app script as returned by `parse_python_script()`
 * @returns A map of the input's `id` to the positions it appears in the app script
 */
export function getKnownPythonInputs(
  serverNode: ParserNode
): ServerPositionMap {
  const inputs: ServerPositionMap = new Map();

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
    const position = getNodePosition(input_call);

    const existing_entry = inputs.get(input_id);

    if (!existing_entry) {
      inputs.set(input_id, [position]);
    } else {
      existing_entry.push(position);
    }
  });

  return inputs;
}
