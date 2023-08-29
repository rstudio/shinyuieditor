import type { Primatives } from "../../r-parsing";

import { isNamedList, printNamedRList } from "./print_named_list";
import { printPrimative } from "./printPrimative";
import { NL_INDENT } from "./utils";

export function printRArgumentValue(value: unknown): string {
  if (Array.isArray(value)) return printRArray(value);

  if (isNamedList(value)) return printNamedRList(value);

  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";

  return JSON.stringify(value);
}

function printRArray(vals: Primatives[]): string {
  const values = vals.map(printPrimative);

  return `c(${NL_INDENT}${values.join(`,${NL_INDENT}`)}\n)`;
}
