import { R_AST, Primative_Array, is_primative } from "./r_ast";

export function flatten_array(node: R_AST): Primative_Array {
  const [call, ...vals] = node;

  if (call.val !== "c") {
    throw new Error("Tried to flatten non array as array");
  }

  return vals.map(({ val }) => (is_primative(val) ? val : flatten_array(val)));
}
