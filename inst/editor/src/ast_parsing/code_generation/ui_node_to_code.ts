import type { Generated_UI_Def } from "communication-types/src/MessageToBackend";
import type { DynamicArgumentInfo } from "ui-node-definitions/src/buildStaticSettingsInfo";
import { isShinyUiNode } from "ui-node-definitions/src/isShinyUiNode";
import type { Lang_Info } from "ui-node-definitions/src/nodeInfoFactory";
import type {
  ShinyUiNode,
  namedArgsObject,
} from "ui-node-definitions/src/uiNodeTypes";
import { getUiNodeInfo } from "ui-node-definitions/src/uiNodeTypes";

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

    const arg_printing_info: Arg_Printing_Info = {
      id: node.id,
      named_args: lang_info.transform_named_args
        ? lang_info.transform_named_args(node.namedArgs)
        : node.namedArgs,
      print_code,
      printed_children:
        "children" in node && node.children
          ? node.children.map((child) => print_code(child))
          : [],
    };

    const printed_args = (
      language === "PYTHON"
        ? print_named_args_python(arg_printing_info)
        : print_named_args_r(arg_printing_info)
    ).map(indent_line_breaks);

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
 * Get the correct name for a given argument in Python mode. If
 * no specific name is set then it just defaults to the name of the argument in
 * the namedArguments field
 * @param settingsInfo The settings info for the node that the argument belongs to
 * @param arg_name The name of the argument
 * @returns The proper name of the argument for the current language mode
 */
function get_python_printed_name(
  settingsInfo: DynamicArgumentInfo,
  arg_name: string
): string {
  const info_for_arg = settingsInfo[arg_name as keyof typeof settingsInfo];

  if (
    info_for_arg &&
    "py_name" in info_for_arg &&
    info_for_arg.py_name !== undefined
  ) {
    return info_for_arg.py_name;
  }
  return arg_name;
}

/**
 * Get the correct name for a given argument in Python mode. If
 * no specific name is set then it just defaults to the name of the argument in
 * the namedArguments field
 * @param settingsInfo The settings info for the node that the argument belongs to
 * @param arg_name The name of the argument
 * @returns The proper name of the argument for the current language mode
 */
function get_r_printed_name(
  settingsInfo: DynamicArgumentInfo,
  arg_name: string
): string {
  const info_for_arg = settingsInfo[arg_name as keyof typeof settingsInfo];

  if (
    info_for_arg &&
    "r_name" in info_for_arg &&
    info_for_arg.r_name !== undefined
  ) {
    return info_for_arg.r_name;
  }
  return arg_name;
}

type Arg_Printing_Info = {
  id: string;
  named_args: namedArgsObject;
  print_code: (x: unknown) => string;
  printed_children: string[];
};

function print_named_args_python({
  id,
  named_args,
  print_code,
  printed_children,
}: Arg_Printing_Info): string[] {
  const { settingsInfo, ordered_positional_args } = getUiNodeInfo(id);

  const printed_positional_args = [...ordered_positional_args].map(
    (arg_name) => {
      const arg_value = named_args[arg_name];
      if (arg_value === undefined) {
        throw new Error(
          `Node ${id} is missing the positional argument ${arg_name}`
        );
      }
      return print_code(arg_value);
    }
  );

  const printed_named_args: string[] = Object.entries(named_args)
    .filter(
      ([name, value]) =>
        !ordered_positional_args.has(name) && value !== undefined
    )
    .map(([arg_name, arg_value]) => {
      return `${get_python_printed_name(settingsInfo, arg_name)} = ${print_code(
        arg_value
      )}`;
    });

  return [
    ...printed_positional_args,
    ...printed_children,
    ...printed_named_args,
  ];
}

function print_named_args_r({
  id,
  named_args: namedArgs,
  print_code,
  printed_children,
}: Arg_Printing_Info): string[] {
  const { settingsInfo } = getUiNodeInfo(id);

  const printed_named_args: string[] = Object.entries(namedArgs).map(
    ([arg_name, arg_value]) => {
      return `${get_r_printed_name(settingsInfo, arg_name)} = ${print_code(
        arg_value
      )}`;
    }
  );

  return [...printed_named_args, ...printed_children];
}
