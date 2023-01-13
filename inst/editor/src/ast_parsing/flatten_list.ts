import { Parsing_Error } from "./parsing_error_class";
import type { Primatives, R_AST } from "./r_ast";
import { is_primative } from "./r_ast";

export type Primative_Map = Record<string, Primatives>;

export function flatten_list(node: R_AST): Primative_Map {
  const [call, ...vals] = node;

  if (call.val !== "list") {
    throw new Parsing_Error({
      message: "Tried to flatten non array as array",
      cause: node,
    });
  }

  let res: Primative_Map = {};

  vals.forEach(({ name, val }) => {
    if (typeof name !== "string") {
      throw new Parsing_Error({
        message: "All elements in list must have a name",
        cause: node,
      });
    }
    if (!is_primative(val)) {
      throw new Parsing_Error({
        message: "Nested lists are not supported",
        cause: node,
      });
    }
    res[name] = val;
  });

  return res;
}
