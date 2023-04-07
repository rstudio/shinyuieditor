import type { R_AST_Node } from "r-ast-parsing";
import { is_function_call } from "r-ast-parsing/src/Function_Call_Node";
import {
  make_character_node,
  name_node,
} from "r-ast-parsing/src/node_builders";

import icon from "../../../assets/icons/shinyValueBox.png";
import { RadioInputs } from "../../../components/Inputs/RadioInputs/RadioInputsSimple";
import { InputLabelWrapper } from "../../../components/Inputs/SettingsFormBuilder/SettingsInput/SettingsInput";
import { DropWatcherPanel } from "../../../DragAndDropHelpers/DropWatcherPanel";
import { mergeClasses } from "../../../utils/mergeClasses";
import { nodeInfoFactory } from "../../nodeInfoFactory";
import type { ShinyUiNode, UiNodeComponent } from "../../uiNodeTypes";
import { CardChildrenWithDropNodes } from "../Utils/ChildrenWithDropNodes";

import { BsIcon } from "./BsIcon";
import { IconSelector } from "./IconSelector";
import styles from "./ValueBox.module.css";

const layout_dir_to_code = {
  left: "showcase_left_center()",
  right: "showcase_top_right()",
} as const;

type ValueBoxArgs = {
  title: string;
  showcase_icon: string;
  value: ShinyUiNode;
  showcase_layout?: keyof typeof layout_dir_to_code;
};

const ValueBox: UiNodeComponent<ValueBoxArgs, { TakesChildren: true }> = ({
  namedArgs,
  children,
  path,
  wrapperProps,
}) => {
  return (
    <div className={styles.container} {...wrapperProps}>
      <div
        className={mergeClasses(
          "bg-primary",
          "text-white",
          styles.value_box,
          namedArgs.showcase_layout === "right" ? styles.showcase_right : null
        )}
      >
        <div className={styles.showcase}>
          <BsIcon icon_name={namedArgs.showcase_icon} />
        </div>
        <div className={styles.content}>
          <h5 className={styles.card_title}>{namedArgs.title}</h5>
          <div className={styles.card_value}>
            <DropWatcherPanel
              existing_node={namedArgs.value}
              child_loc={"value"}
              parentPath={path}
              messageOnHover={
                namedArgs.value ? "Replace value" : "Drop a value node here"
              }
              parentNodeType="value_box"
            />
          </div>
          <CardChildrenWithDropNodes
            children={children}
            path={path}
            parentid="value_box"
            messageOnHover="Add node to value box"
          />
        </div>
      </div>
    </div>
  );
};

export const bslibValueBoxInfo = nodeInfoFactory<ValueBoxArgs>()({
  r_package: "bslib",
  r_fn_name: "value_box",
  title: "Value Box",
  takesChildren: true,
  UiComponent: ValueBox,
  settingsInfo: {
    title: {
      label: "Title of valuebox",
      inputType: "string",
      defaultValue: "Look at me!",
    },
    showcase_icon: {
      inputType: "omitted",
      defaultValue: "database",
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
  settingsFormRender: ({ settings, onSettingsChange, inputs }) => {
    return (
      <div>
        <InputLabelWrapper
          label="Choose icon for showcase"
          labelId="showcase-icon"
          mainInput={
            <IconSelector
              initialValue={settings.showcase_icon}
              onIconSelect={(icon_name) => {
                onSettingsChange?.("showcase_icon", {
                  type: "UPDATE",
                  value: icon_name,
                });
              }}
            />
          }
        />
        <InputLabelWrapper
          label="Showcase Direction"
          labelId="showcase-direction"
          mainInput={
            <RadioInputs
              id="showcase-direction"
              label="Showcase Direction"
              value={settings.showcase_layout ?? "left"}
              onChange={(dir) => {
                onSettingsChange?.(
                  "showcase_layout",
                  dir === "left"
                    ? { type: "REMOVE" }
                    : {
                        type: "UPDATE",
                        value: dir,
                      }
                );
              }}
              optionsPerColumn={2}
              choices={{
                left: { label: "Left" },
                right: { label: "Right" },
              }}
            />
          }
        />

        {Object.values(inputs)}
      </div>
    );
  },
  code_gen_R: {
    print_named_args: (args, render_child) => {
      const { title, showcase_icon, value, showcase_layout } = args;

      const named_args = [
        `title = "${title}"`,
        `value = ${render_child(value)}`,
        `showcase = bsicons::bs_icon("${showcase_icon}")`,
      ];

      if (showcase_layout) {
        named_args.push(
          `showcase_layout = ${layout_dir_to_code[showcase_layout]}`
        );
      }
      return named_args;
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
  iconSrc: icon,
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
