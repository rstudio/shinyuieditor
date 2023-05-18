import type { ParserNode } from "treesitter-parsers";

/**
 * Check if a node represents an access to a property on an R object using the
 * `obj$prop` syntax and returns the name of the property if the `obj` name
 * matches what was requested
 * @param node Node to check
 * @param obj_name Name of the object to check for access of
 * @returns Name of the accessed property if the node is an access to the
 * requested object, otherwise null
 */
export function get_name_of_accessed_property(
  node: ParserNode,
  obj_name: string
): string | null {
  if (node.type !== "dollar" || node.firstNamedChild?.text !== obj_name) {
    return null;
  }

  const output_name = node.namedChild(1)?.text ?? null;

  return output_name;
}
