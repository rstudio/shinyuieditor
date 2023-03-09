import type { R_Ui_Code } from "communication-types/src/MessageToBackend";
import type {
  ShinyUiNames,
  ShinyUiNode,
  ShinyUiNodeByName,
} from "editor/src/Shiny-Ui-Elements/uiNodeTypes";
import { isParentNode } from "editor/src/Shiny-Ui-Elements/uiNodeTypes";
import type { Primatives } from "r-ast-parsing";
import { is_object } from "util-functions/src/is_object";

import { text_node_to_code } from "../text_nodes/text_node_to_code";

import {
  indent_line_breaks,
  LINE_BREAK_LENGTH,
  NL_INDENT,
  should_line_break,
} from "./build_function_text";

function isUiNodeOfType<UiName extends ShinyUiNames>(
  x: unknown,
  uiName: UiName
): x is ShinyUiNodeByName[UiName] {
  return is_object(x) && "uiName" in x && x.uiName === uiName;
}

/**
 * Convert a ui ast node into formatted R code.
 * @param node Ui Node to be converted
 * @param opts Options controlling how code generation runs
 * @returns Object with constructed code and library calls
 */
export function ui_node_to_R_code(
  node: ShinyUiNode,
  opts: { remove_namespace: boolean }
): R_Ui_Code {
  const { ui_code, removed_namespaces } = ui_node_to_R_code_internal(
    node,
    opts
  );

  return { ui_code, library_calls: Array.from(removed_namespaces) };
}

/**
 * Internal version of r code generation. Difference is this one returns a set
 * of namespaces/libraries removed instead of concatinated text like the
 * exported version.
 * @param node
 * @param opts
 * @returns
 */
function ui_node_to_R_code_internal(
  node: ShinyUiNode,
  opts: { remove_namespace: boolean }
): {
  ui_code: string;
  removed_namespaces: Set<string>;
} {
  const { uiName, uiArguments } = node;
  const removed_namespaces: Set<string> = new Set<string>();

  if (isUiNodeOfType(node, "unknownUiFunction")) {
    return {
      ui_code: print_unknown_ui_node(node),
      removed_namespaces,
    };
  }

  if (isUiNodeOfType(node, "textNode")) {
    return {
      ui_code: text_node_to_code(node),
      removed_namespaces,
    };
  }

  let fn_name: string = uiName;

  if (opts.remove_namespace) {
    const library_name = fn_name.match(/\w+(?=::)/)?.[0];

    if (library_name) {
      removed_namespaces.add(library_name);
    }

    fn_name = fn_name.replace(/\w+::/, "");
  }

  const fn_args_list = Object.entries(uiArguments).map(
    ([arg_name, arg_value]) =>
      indent_line_breaks(`${arg_name} = ${print_R_argument_value(arg_value)}`)
  );

  if (isParentNode(node)) {
    node.uiChildren?.forEach((child) => {
      const child_code = ui_node_to_R_code_internal(child, opts);

      child_code.removed_namespaces.forEach((name) =>
        removed_namespaces.add(name)
      );

      fn_args_list.push(indent_line_breaks(child_code.ui_code));
    });
  }

  const is_multi_line_call = should_line_break({
    fn_name: uiName,
    fn_args_list,
    max_line_length_for_multi_args: LINE_BREAK_LENGTH,
  });

  const arg_seperator = `,${is_multi_line_call ? NL_INDENT : " "}`;

  return {
    removed_namespaces,
    ui_code: `${fn_name}(${
      is_multi_line_call ? NL_INDENT : ""
    }${fn_args_list.join(arg_seperator)}${is_multi_line_call ? "\n" : ""})`,
  };
}
export type NamedList = Record<string, string>;

function print_unknown_ui_node({
  uiArguments,
}: ShinyUiNodeByName["unknownUiFunction"]) {
  return uiArguments.text;
}

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

  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";

  if (isUiNodeOfType(value, "unknownUiFunction")) {
    return print_unknown_ui_node(value);
  }

  return JSON.stringify(value);
}
