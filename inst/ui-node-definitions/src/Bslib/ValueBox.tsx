import type { R_AST_Node } from "r-ast-parsing";
import { is_function_call } from "r-ast-parsing/src/Function_Call_Node";
import {
  make_character_node,
  name_node,
} from "r-ast-parsing/src/node_builders";

import { make_unknown_ui_function } from "../make_unknown_ui_function";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type { ShinyUiNode, namedArgsObject } from "../uiNodeTypes";

const layout_dir_to_code = {
  left: "showcase_left_center()",
  right: "showcase_top_right()",
} as const;

export const bslib_value_box = nodeInfoFactory<{
  title: string;
  showcase_icon?: string;
  showcase?: unknown;
  value: ShinyUiNode;
  showcase_layout?: keyof typeof layout_dir_to_code;
}>()({
  id: "value_box",
  r_info: {
    fn_name: "value_box",
    package: "bslib",
    transform_named_args: (args) => {
      const { showcase_icon, showcase_layout, ...others } = args;

      const to_return = others as namedArgsObject;
      if (showcase_icon) {
        to_return.showcase = make_unknown_ui_function(
          `bsicons::bs_icon("${showcase_icon}")`
        );
      }

      if (showcase_layout) {
        to_return.showcase_layout = make_unknown_ui_function(
          layout_dir_to_code[showcase_layout]
        );
      }

      return to_return;
    },
    preprocess_raw_ast_arg: (arg) => {
      switch (arg.name) {
        case "showcase":
          return convertShowcaseArg(arg);
        case "showcase_layout":
          return convertShowcaseLayoutArg(arg);
        default:
          return arg;
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
    },
    showcase: {
      inputType: "omitted",
      optional: true,
    },
    value: {
      inputType: "ui-node",
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
function convertShowcaseArg(arg: R_AST_Node) {
  const is_icon_call =
    is_function_call(arg, "bsicons::bs_icon") ||
    is_function_call(arg, "bs_icon");

  if (is_icon_call) {
    const icon = arg.val[1].val as string;
    return name_node(make_character_node(icon), "showcase_icon");
  }

  return arg;
}

/**
 *
 * @param arg Argument representing the passed value to the "showcase_layout"
 * argument of the value_box function call.
 * @returns Updated argument, converting the function call to a character node
 * of left or right based on the original passed function.
 */
function convertShowcaseLayoutArg(arg: R_AST_Node) {
  if (is_function_call(arg, "showcase_left_center")) {
    return name_node(make_character_node("left"), "showcase_layout");
  } else if (is_function_call(arg, "showcase_top_right")) {
    return name_node(make_character_node("right"), "showcase_layout");
  }

  return arg;
}
