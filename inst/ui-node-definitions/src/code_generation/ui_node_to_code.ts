import type { LanguageMode } from "communication-types/src/AppInfo";
import type { GeneratedUiDef } from "communication-types/src/MessageToBackend";
import type { DynamicArgumentInfo } from "ui-node-definitions/src/buildStaticSettingsInfo";
import { isShinyUiNode } from "ui-node-definitions/src/isShinyUiNode";
import type { LangInfo } from "ui-node-definitions/src/nodeInfoFactory";

import type { ShinyUiNode } from "../ShinyUiNode";
import type { NamedArgsObject } from "../uiNodeTypes";
import { getUiNodeInfo } from "../uiNodeTypes";

import {
  indentLineBreaks,
  LINE_BREAK_LENGTH,
  NL_INDENT,
  shouldLineBreak,
} from "./build_function_text";
import {
  isInternalUiNode,
  printInternalUiNodes,
} from "./print_internal_ui_nodes";
import { printPythonArgumentValue } from "./ui_node_to_python_code";
import { printRArgumentValue } from "./ui_node_to_R_code";

export function uiNodeTocode(
  node: ShinyUiNode,
  language: LanguageMode,
  opts?: { remove_namespace?: boolean }
): GeneratedUiDef {
  const removed_namespaces: Set<string> = new Set<string>();

  const remove_namespaces = opts?.remove_namespace ?? true;
  function printCode(node: unknown): string {
    return isShinyUiNode(node)
      ? printUiNode(node)
      : language === "PYTHON"
      ? printPythonArgumentValue(node)
      : printRArgumentValue(node);
  }

  function printUiNode(node: ShinyUiNode): string {
    if (isInternalUiNode(node)) {
      return printInternalUiNodes(node);
    }

    // Check if the ui node has a custom print function
    const { settingsInfo, ...node_info } = getUiNodeInfo(node.id);

    const lang_info = (
      language === "PYTHON" ? node_info.py_info : node_info.r_info
    ) as LangInfo<NamedArgsObject, string, string>;

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

    const arg_printing_info: ArgPrintingInfo = {
      id: node.id,
      named_args: lang_info.transform_named_args
        ? lang_info.transform_named_args(node.namedArgs)
        : node.namedArgs,
      print_code: printCode,
      printed_children:
        "children" in node && node.children
          ? node.children.map((child) => printCode(child))
          : [],
    };

    const printed_args = (
      language === "PYTHON"
        ? printNamedArgsPython(arg_printing_info)
        : printNamedArgsR(arg_printing_info)
    ).map(indentLineBreaks);

    if (
      shouldLineBreak({
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
    code: printCode(node),
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
function getPythonPrintedName(
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

  // Special case for inputId and outputId if they are not already mapped. This
  // is because python's inputs and outputs use  a plain `id` argument instead
  // of `inputId` and `outputId`
  if (arg_name === "inputId" || arg_name === "outputId") {
    return "id";
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
function getRPrintedName(
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

type ArgPrintingInfo = {
  id: string;
  named_args: NamedArgsObject;
  print_code: (x: unknown) => string;
  printed_children: string[];
};

function printNamedArgsPython({
  id,
  named_args,
  print_code,
  printed_children,
}: ArgPrintingInfo): string[] {
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
      return `${getPythonPrintedName(settingsInfo, arg_name)} = ${print_code(
        arg_value
      )}`;
    });

  return [
    ...printed_positional_args,
    ...printed_children,
    ...printed_named_args,
  ];
}

function printNamedArgsR({
  id,
  named_args: namedArgs,
  print_code,
  printed_children,
}: ArgPrintingInfo): string[] {
  const { settingsInfo } = getUiNodeInfo(id);

  const printed_named_args: string[] = Object.entries(namedArgs).map(
    ([arg_name, arg_value]) => {
      return `${getRPrintedName(settingsInfo, arg_name)} = ${print_code(
        arg_value
      )}`;
    }
  );

  return [...printed_named_args, ...printed_children];
}
