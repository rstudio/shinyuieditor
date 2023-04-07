import type { R_Ui_Code } from "communication-types/src/MessageToBackend";
import type { ShinyUiNode } from "editor/src/Shiny-Ui-Elements/uiNodeTypes";
import { getUiNodeInfo } from "editor/src/Shiny-Ui-Elements/uiNodeTypes";
import type { Primatives } from "r-ast-parsing";

import { isShinyUiNode } from "../../Shiny-Ui-Elements/isShinyUiNode";
import type { ProcessNamedArgs } from "../../Shiny-Ui-Elements/nodeInfoFactory";

import {
  indent_line_breaks,
  LINE_BREAK_LENGTH,
  NL_INDENT,
  should_line_break,
} from "./build_function_text";
import {
  isInternalUiNode,
  print_internal_ui_nodes,
} from "./print_internal_ui_nodes";
import { isNamedList, print_named_R_list } from "./print_named_list";

/**
 * Convert a ui ast node into formatted python code.
 * @param node Ui Node to be converted
 * @returns Object with constructed code and library calls
 */
export function ui_node_to_python_code(node: ShinyUiNode): R_Ui_Code {
  const removed_namespaces: Set<string> = new Set<string>();

  function print_code(node: unknown): string {
    return isShinyUiNode(node)
      ? print_ui_node(node)
      : print_R_argument_value(node);
  }

  function print_ui_node(node: ShinyUiNode): string {
    if (isInternalUiNode(node)) {
      return print_internal_ui_nodes(node);
    }

    // Check if the ui node has a custom print function
    const node_info = getUiNodeInfo(node.id);

    const fn_name: string = node_info.py_fn_name;

    const library_name = node_info.r_package;

    if (library_name && library_name !== "Internal") {
      removed_namespaces.add(library_name);
    }

    let fn_args_list: string[] = [];

    // Print the named arguments first
    if (node_info.code_gen_R?.print_named_args) {
      // Need to do some coercion here to get the types to work out because of
      // the ProcessNamedArgs being scoped to the specific node's arguments type
      // but this printing function is generic to all nodes
      const arg_printer = node_info.code_gen_R
        ?.print_named_args as ProcessNamedArgs<typeof node.namedArgs>;
      fn_args_list = arg_printer(node.namedArgs, print_code);
    } else {
      for (const [arg_name, arg_value] of Object.entries(node.namedArgs)) {
        fn_args_list.push(`${arg_name} = ${print_code(arg_value)}`);
      }
    }

    // Next handle the children
    if ("children" in node && node.children) {
      for (const child of node.children) {
        fn_args_list.push(print_code(child));
      }
    }

    const printed_args = fn_args_list.map(indent_line_breaks);

    if (
      should_line_break({
        fn_name,
        fn_args_list,
        max_line_length_for_multi_args: LINE_BREAK_LENGTH,
      })
    ) {
      return `${fn_name}(${NL_INDENT}${printed_args.join(`,${NL_INDENT}`)}\n)`;
    }
    return `${fn_name}(${printed_args.join(", ")})`;
  }

  return {
    ui_code: print_code(node),
    library_calls: Array.from(removed_namespaces),
  };
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

  return JSON.stringify(value);
}
