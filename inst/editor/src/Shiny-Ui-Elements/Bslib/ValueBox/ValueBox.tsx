import { is_function_call } from "r-ast-parsing/src/node_identity_checkers";

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
  uiArguments,
  uiChildren,
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
          uiArguments.showcase_layout === "right" ? styles.showcase_right : null
        )}
      >
        <div className={styles.showcase}>
          <BsIcon icon_name={uiArguments.showcase_icon} />
        </div>
        <div className={styles.content}>
          <h5 className={styles.card_title}>{uiArguments.title}</h5>
          <div className={styles.card_value}>
            <DropWatcherPanel
              existing_node={uiArguments.value}
              child_loc={"value"}
              parentPath={path}
              messageOnHover={
                uiArguments.value ? "Replace value" : "Drop a value node here"
              }
              parentNodeType="bslib::value_box"
            />
          </div>
          <CardChildrenWithDropNodes
            uiChildren={uiChildren}
            path={path}
            parentUiName="bslib::value_box"
            messageOnHover="Add node to value box"
          />
        </div>
      </div>
    </div>
  );
};

export const bslibValueBoxInfo = nodeInfoFactory<ValueBoxArgs>()({
  library: "bslib",
  name: "value_box",
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
      defaultValue: "circle",
    },
    value: {
      inputType: "ui-node",
      defaultValue: {
        uiName: "textNode",
        uiArguments: {
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
      const arg_name = arg.name;
      if (!arg_name) return arg;

      if (
        arg_name === "showcase" &&
        (is_function_call(arg, "bsicons::bs_icon") ||
          is_function_call(arg, "bs_icon"))
      ) {
        const icon = arg.val[1].val as string;
        return {
          name: "showcase_icon",
          val: icon,
          type: "c",
        };
      } else if (arg_name === "showcase_layout") {
        if (is_function_call(arg, "showcase_left_center")) {
          return {
            name: "showcase_layout",
            val: "left",
            type: "c",
          };
        } else if (is_function_call(arg, "showcase_top_right")) {
          return {
            name: "showcase_layout",
            val: "right",
            type: "c",
          };
        }
      }

      return arg;
    },
  },
  iconSrc: icon,
  category: "Cards",
  description: "Colorful box to display a value",
});
