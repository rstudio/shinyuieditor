import { LINE_BREAK_LENGTH, NL_INDENT } from "./build_function_text";

type NamedList = Record<string, string>;

function print_named_list(
  vals: NamedList,
  open_list: string,
  close_list: string
): string {
  const values = Object.keys(vals).map((name) => `"${name}" = "${vals[name]}"`);

  // Add 6 for length of `list(` prefix and `)` postfix
  const total_list_length = values.reduce((l, a) => l + a.length, 0) + 6;

  const is_multiline = total_list_length > LINE_BREAK_LENGTH;

  const arg_seperator = is_multiline ? `,${NL_INDENT}` : `, `;

  return `${open_list}${is_multiline ? NL_INDENT : ""}${values.join(
    arg_seperator
  )}${is_multiline ? "\n" : ""}${close_list}`;
}

/**
 * Generate code for an R list from a dictionary of keys and values
 * @param vals Named list of values to print
 * @returns A list in R syntax. E.g. list("a" = 1, "b" = 2, "c" = "d")
 */
export function print_named_R_list(vals: NamedList): string {
  return print_named_list(vals, "list(", ")");
}

/**
 * Generate code for a Python dictionary from a dictionary of keys and values
 * @param vals Named list of values to print
 * @returns A dictionary in Python syntax. E.g. {"a": 1, "b": 2, "c": "d"}
 */
export function print_named_python_list(vals: NamedList): string {
  return print_named_list(vals, "{", "}");
}

export function isNamedList(x: any): x is NamedList {
  if (typeof x !== "object") return false;

  const hasNonStringEntries = Object.values(x).find(
    (el) => typeof el !== "string"
  );
  if (hasNonStringEntries) return false;

  return true;
}
