import type { Generated_UI_Def } from "communication-types/src/MessageToBackend";
import type {
  namedArgsObject,
  ShinyUiNode,
} from "editor/src/Shiny-Ui-Elements/uiNodeTypes";
import { getUiNodeInfo } from "editor/src/Shiny-Ui-Elements/uiNodeTypes";

import type { DynamicArgumentInfo } from "../../components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import { isShinyUiNode } from "../../Shiny-Ui-Elements/isShinyUiNode";
import type { Lang_Info } from "../../Shiny-Ui-Elements/nodeInfoFactory";
import type { Language_Mode } from "../../state/languageMode";

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
import { print_python_argument_value } from "./ui_node_to_python_code";
import { print_R_argument_value } from "./ui_node_to_R_code";

export function ui_node_to_code(
  node: ShinyUiNode,
  language: Language_Mode,
  opts?: { remove_namespace?: boolean }
): Generated_UI_Def {
  const removed_namespaces: Set<string> = new Set<string>();

  const remove_namespaces = opts?.remove_namespace ?? true;
  function print_code(node: unknown): string {
    return isShinyUiNode(node)
      ? print_ui_node(node)
      : language === "PYTHON"
      ? print_python_argument_value(node)
      : print_R_argument_value(node);
  }

  function print_ui_node(node: ShinyUiNode): string {
    if (isInternalUiNode(node)) {
      return print_internal_ui_nodes(node);
    }

    // Check if the ui node has a custom print function
    const { settingsInfo, ...node_info } = getUiNodeInfo(node.id);

    const lang_info = (
      language === "PYTHON" ? node_info.py_info : node_info.r_info
    ) as Lang_Info<namedArgsObject, string, string>;

    if (!lang_info) {
      throw new Error(`Node ${node.id} has no ${language} info`);
    }

    if (
      language === "R" &&
      remove_namespaces &&
      lang_info.package !== "Internal"
    ) {
      removed_namespaces.add(lang_info.package);
    }

    const fn_name =
      language === "R" && !remove_namespaces
        ? `${lang_info.package}::${lang_info.fn_name}`
        : lang_info.fn_name;

    const named_args = lang_info.transform_named_args
      ? lang_info.transform_named_args(node.namedArgs)
      : node.namedArgs;

    const printed_positional_args = Object.entries(settingsInfo)
      .filter(
        ([, info]) =>
          language === "PYTHON" && info.py_positional_index !== undefined
      )
      .sort(
        ([, a_info], [, b_info]) =>
          (a_info.py_positional_index as number) -
          (b_info.py_positional_index as number)
      )
      .map(([arg_name]) => {
        const arg_value = named_args[arg_name];
        if (arg_value === undefined) {
          throw new Error(
            `Node ${node.id} is missing the positional argument ${arg_name}`
          );
        }
        return print_code(arg_value);
      });

    const printed_named_args: string[] = Object.entries(named_args)
      .filter(
        ([name, value]) =>
          !(
            language === "PYTHON" &&
            "py_positional_index" in
              settingsInfo[name as keyof typeof settingsInfo] &&
            value !== undefined
          )
      )
      .map(([arg_name, arg_value]) => {
        return `${get_printed_name(
          language,
          settingsInfo,
          arg_name
        )} = ${print_code(arg_value)}`;
      });

    const printed_child_args: string[] =
      "children" in node && node.children
        ? node.children.map((child) => print_code(child))
        : [];

    // We need to reverse the order for the args in python compared to R
    const printed_args_in_order =
      language === "R"
        ? [
            ...printed_positional_args,
            ...printed_named_args,
            ...printed_child_args,
          ]
        : [
            ...printed_positional_args,
            ...printed_child_args,
            ...printed_named_args,
          ];

    const printed_args = printed_args_in_order.map(indent_line_breaks);

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

/**
 * Get the correct name for a given argument given the current language mode. If
 * no specific name is set then it just defaults to the name of the argument in
 * the namedArguments field
 * @param language The current language mode
 * @param settingsInfo The settings info for the node that the argument belongs to
 * @param arg_name The name of the argument
 * @returns The proper name of the argument for the current language mode
 */
function get_printed_name(
  language: Language_Mode,
  settingsInfo: DynamicArgumentInfo,
  arg_name: string
): string {
  const info_for_arg = settingsInfo[arg_name as keyof typeof settingsInfo];

  if (info_for_arg) {
    if (language === "R" && "r_name" in info_for_arg) {
      return info_for_arg.r_name ?? arg_name;
    }

    if (language === "PYTHON" && "py_name" in info_for_arg) {
      return info_for_arg.py_name ?? arg_name;
    }
  }

  return arg_name;
}
