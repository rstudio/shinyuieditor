import type { Primatives } from "../../../r-bindings/src";

import { isNamedList, printNamedPythonList } from "./print_named_list";
import { NL_INDENT } from "./utils";

export function printPythonArgumentValue(value: unknown): string {
  if (Array.isArray(value)) return printPythonArray(value);

  if (isNamedList(value)) return printNamedPythonList(value);

  if (typeof value === "boolean") return value ? "True" : "False";

  return JSON.stringify(value);
}

export function printPythonArray(vals: Primatives[]): string {
  const values = vals.map(printPrimative);

  return `[${NL_INDENT}${values.join(`,${NL_INDENT}`)}\n]`;
}

function printPrimative(val: Primatives): string {
  switch (typeof val) {
    case "string":
      return `"${val}"`;
    default:
      return String(val);
  }
}
