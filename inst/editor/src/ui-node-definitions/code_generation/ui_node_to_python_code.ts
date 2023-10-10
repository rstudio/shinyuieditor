import type { Primatives } from "../../parsing/Primatives";

import { isNamedList, printNamedPythonList } from "./print_named_list";
import { printPrimative } from "./printPrimative";
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
