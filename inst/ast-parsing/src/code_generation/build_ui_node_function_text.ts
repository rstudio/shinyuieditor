import type { ShinyUiNode } from "editor/src/Shiny-Ui-Elements/uiNodeTypes";

import type { Primatives } from "..";

import {
  LINE_BREAK_LENGTH,
  NL_INDENT,
  indent_line_breaks,
  should_line_break,
} from "./build_function_text";

export function build_ui_node_function_text({
  uiName: fn_name,
  uiArguments,
  uiChildren,
}: ShinyUiNode): string {
  if (fn_name === "unknownUiFunction") {
    return uiArguments.text;
  }

  const fn_args_list: string[] = [];

  for (const arg_name in uiArguments) {
    const value_text = print_R_argument_value(uiArguments[arg_name]);

    fn_args_list.push(indent_line_breaks(`${arg_name} = ${value_text}`));
  }

  uiChildren?.forEach((child) => {
    fn_args_list.push(indent_line_breaks(build_ui_node_function_text(child)));
  });

  const is_multi_line_call = should_line_break({
    fn_name,
    fn_args_list,
    max_line_length_for_multi_args: LINE_BREAK_LENGTH,
  });

  const arg_seperator = `,${is_multi_line_call ? NL_INDENT : " "}`;

  return `${fn_name}(${is_multi_line_call ? NL_INDENT : ""}${fn_args_list.join(
    arg_seperator
  )}${is_multi_line_call ? "\n" : ""})`;
}

export type NamedList = Record<string, string>;

export function isNamedList(x: any): x is NamedList {
  if (typeof x !== "object") return false;

  const hasNonStringEntries = Object.values(x).find(
    (el) => typeof el !== "string"
  );
  if (hasNonStringEntries) return false;

  return true;
}

function print_named_R_list(vals: NamedList): string {
  const values = Object.keys(vals).map((name) => `"${name}" = "${vals[name]}"`);

  // Add 6 for length of `list(` prefix and `)` postfix
  const total_list_length = values.reduce((l, a) => l + a.length, 0) + 6;

  const is_multiline = total_list_length > LINE_BREAK_LENGTH;

  const arg_seperator = is_multiline ? `,${NL_INDENT}` : `, `;

  return `list(${is_multiline ? NL_INDENT : ""}${values.join(arg_seperator)}${
    is_multiline ? "\n" : ""
  })`;
}

function print_R_array(vals: Primatives[]): string {
  const values = vals.map(print_primative);

  return `c(${NL_INDENT}${values.join(`,${NL_INDENT}`)}\n)`;
}

function print_primative(val: Primatives): string {
  switch (typeof val) {
    case "string":
      return `"${val}"`;
    default:
      return String(val);
  }
}

function print_R_argument_value(value: unknown): string {
  if (Array.isArray(value)) return print_R_array(value);

  if (isNamedList(value)) return print_named_R_list(value);

  return JSON.stringify(value);
}
