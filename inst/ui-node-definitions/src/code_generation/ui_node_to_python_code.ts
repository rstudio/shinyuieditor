import type { Primatives } from "../../../r-bindings/src";

import { NL_INDENT } from "./build_function_text";
import { isNamedList, print_named_python_list } from "./print_named_list";

export function print_python_argument_value(value: unknown): string {
  if (Array.isArray(value)) return print_python_array(value);

  if (isNamedList(value)) return print_named_python_list(value);

  if (typeof value === "boolean") return value ? "True" : "False";

  return JSON.stringify(value);
}

export function print_python_array(vals: Primatives[]): string {
  const values = vals.map(print_primative);

  return `[${NL_INDENT}${values.join(`,${NL_INDENT}`)}\n]`;
}

function print_primative(val: Primatives): string {
  switch (typeof val) {
    case "string":
      return `"${val}"`;
    default:
      return String(val);
  }
}
