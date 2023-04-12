import type { Generated_UI_Def } from "communication-types/src/MessageToBackend";
import type { ShinyUiNode } from "editor/src/Shiny-Ui-Elements/uiNodeTypes";
import { getUiNodeInfo } from "editor/src/Shiny-Ui-Elements/uiNodeTypes";
import type { Primatives } from "r-ast-parsing";

import { isShinyUiNode } from "../../Shiny-Ui-Elements/isShinyUiNode";
import type { Named_Arg_Transformer } from "../../Shiny-Ui-Elements/nodeInfoFactory";

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
export function ui_node_to_python_code(node: ShinyUiNode): Generated_UI_Def {
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

    if (!("py_info" in node_info)) {
      throw new Error(`Node ${node.id} has no python info`);
    }

    const { fn_name, package: library_name } = node_info.py_info;

    if (library_name) {
      removed_namespaces.add(library_name);
    }

    const arg_transformer =
      "transform_named_args" in node_info.py_info
        ? // Forgive me for I have sinned
          (node_info.py_info
            .transform_named_args as any as Named_Arg_Transformer<
            typeof node.namedArgs
          >)
        : null;

    const named_args = arg_transformer
      ? arg_transformer(node.namedArgs)
      : node.namedArgs;

    const printed_named_args: string[] = Object.entries(named_args).map(
      ([arg_name, arg_value]) => `${arg_name} = ${print_code(arg_value)}`
    );

    const printed_child_args: string[] =
      "children" in node && node.children
        ? node.children.map((child) => print_code(child))
        : [];

    const printed_args = [...printed_child_args, ...printed_named_args].map(
      indent_line_breaks
    );

    if (
      should_line_break({
        fn_name,
        fn_args_list: printed_args,
        max_line_length_for_multi_args: LINE_BREAK_LENGTH,
      })
    ) {
      return `${fn_name}(${NL_INDENT}${printed_args.join(`,${NL_INDENT}`)}\n)`;
    }
    return `${fn_name}(${printed_args.join(", ")})`;
  }

  return {
    code: print_code(node),
    packages: Array.from(removed_namespaces),
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
