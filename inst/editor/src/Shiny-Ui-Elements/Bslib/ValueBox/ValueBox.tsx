import { is_function_call } from "r-ast-parsing/src/node_identity_checkers";

import icon from "../../../assets/icons/shinyContainer.png";
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
          <h5>{uiArguments.title}</h5>
          <DropWatcherPanel
            existing_node={uiArguments.value}
            child_loc={"value"}
            parentPath={path}
            messageOnHover={
              uiArguments.value ? "Replace value" : "Drop a value node here"
            }
            parentNodeType="bslib::value_box"
          />
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
        uiName: "shiny::textOutput",
        uiArguments: {
          outputId: "valueBoxValue",
        },
      },
    },
    showcase_layout: {
      label: "Showcase Side",
      inputType: "radio",
      defaultValue: "left",
      optional: true,
      optionsPerColumn: 2,
      choices: {
        left: { label: "Left" },
        right: { label: "Right" },
      },
    },
  },
  settingsFormRender: ({ settings, onSettingsChange, inputs }) => {
    return (
      <div>
        <p>Here's the settings for the value box!</p>
        <label>Choose icon for showcase</label>
        <IconSelector
          initialValue={settings.showcase_icon}
          onIconSelect={(icon_name) => {
            onSettingsChange?.("showcase_icon", {
              type: "UPDATE",
              value: icon_name,
            });
          }}
        />
        {Object.values(inputs)}
      </div>
    );
  },
  process_named_args: (args, render_child) => {
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
  preprocess_ast_arg: (arg) => {
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
  iconSrc: icon,
  category: "Cards",
  description: "Colorful box to display a value",
});
