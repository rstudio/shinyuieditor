import { LINE_BREAK_LENGTH, NL_INDENT } from "./build_function_text";

export function print_named_R_list(vals: NamedList): string {
  const values = Object.keys(vals).map((name) => `"${name}" = "${vals[name]}"`);

  // Add 6 for length of `list(` prefix and `)` postfix
  const total_list_length = values.reduce((l, a) => l + a.length, 0) + 6;

  const is_multiline = total_list_length > LINE_BREAK_LENGTH;

  const arg_seperator = is_multiline ? `,${NL_INDENT}` : `, `;

  return `list(${is_multiline ? NL_INDENT : ""}${values.join(arg_seperator)}${
    is_multiline ? "\n" : ""
  })`;
}
type NamedList = Record<string, string>;

export function isNamedList(x: any): x is NamedList {
  if (typeof x !== "object") return false;

  const hasNonStringEntries = Object.values(x).find(
    (el) => typeof el !== "string"
  );
  if (hasNonStringEntries) return false;

  return true;
}
