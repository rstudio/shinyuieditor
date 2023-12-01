import type { ParserNode } from "treesitter-parsers";
import { extract_call_content, is_call_node } from "treesitter-parsers";

import {
  is_string_node,
  extract_string_content,
} from "../../r-parsing/NodeTypes/StringNode";
import { makeUnknownUiFunction } from "../internal/UnknownUiFunction/make_unknown_ui_function";
import type { PreprocessedArgNode } from "../nodeInfoFactory";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type { ShinyUiNode } from "../ShinyUiNode";
import type { NamedArgsObject } from "../uiNodeTypes";

const layout_dir_to_code = {
  left: "showcase_left_center()",
  right: "showcase_top_right()",
} as const;

export const value_box = nodeInfoFactory<{
  title: string;
  showcase_icon?: string;
  showcase?: unknown;
  value?: ShinyUiNode;
  showcase_layout?: keyof typeof layout_dir_to_code;
}>()({
  id: "value_box",
  r_info: {
    fn_name: "value_box",
    package: "bslib",
    transform_named_args: (args) => {
      const { showcase_icon, showcase_layout, ...others } = args;

      const to_return = others as NamedArgsObject;
      if (showcase_icon) {
        to_return.showcase = makeUnknownUiFunction(
          `bsicons::bs_icon("${showcase_icon}")`
        );
      }

      if (showcase_layout) {
        to_return.showcase_layout = makeUnknownUiFunction(
          layout_dir_to_code[showcase_layout]
        );
      }

      return to_return;
    },
    preprocess_raw_ast_arg: ({ name, value }) => {
      switch (name) {
        case "showcase":
          return convertShowcaseArg(value);
        case "showcase_layout":
          return convertShowcaseLayoutArg(value);
        default:
          return null;
      }
    },
  },
  title: "Value Box",
  takesChildren: true,
  settingsInfo: {
    title: {
      label: "Title of valuebox",
      inputType: "string",
      defaultValue: "Look at me!",
    },
    showcase_icon: {
      inputType: "omitted",
      optional: true,
      defaultValue: "database",
      useDefaultIfOptional: true,
    },
    showcase: {
      inputType: "omitted",
      optional: true,
    },
    value: {
      inputType: "ui-node",
      optional: true,
      defaultValue: {
        id: "textNode",
        namedArgs: {
          contents: "My value",
        },
      },
    },
    showcase_layout: {
      inputType: "omitted",
      defaultValue: "left",
      optional: true,
    },
  },
  category: "Cards",
  description: "Colorful box to display a value",
});

/**
 *
 * @param arg Argument representing the passed value to the "showcase" argument
 * of the value_box function call
 * @returns Updated argument, switching the name to the internal "showcase_icon"
 * and converting the icon, if it exists, to a character node representing the
 * icon name. If the passed value doesn't match an icon format. Then the
 * original is returned.
 */
function convertShowcaseArg(value: ParserNode): PreprocessedArgNode | null {
  if (!is_call_node(value)) {
    return null;
  }
  const { fn_name, fn_args } = extract_call_content(value);
  const is_icon_call = fn_name === "bsicons::bs_icon" || fn_name === "bs_icon";

  if (is_icon_call && is_string_node(fn_args[0])) {
    return {
      name: "showcase_icon",
      value: extract_string_content(fn_args[0]),
    };
  }

  return null;
}

/**
 *
 * @param arg Argument representing the passed value to the "showcase_layout"
 * argument of the value_box function call.
 * @returns Updated argument, converting the function call to a character node
 * of left or right based on the original passed function.
 */
function convertShowcaseLayoutArg(
  value: ParserNode
): PreprocessedArgNode | null {
  if (!is_call_node(value)) {
    return null;
  }
  const { fn_name } = extract_call_content(value);

  if (fn_name === "showcase_left_center") {
    return {
      name: "showcase_layout",
      value: "left",
    };
  }
  if (fn_name === "showcase_top_right") {
    return {
      name: "showcase_layout",
      value: "right",
    };
  }

  return null;
}
