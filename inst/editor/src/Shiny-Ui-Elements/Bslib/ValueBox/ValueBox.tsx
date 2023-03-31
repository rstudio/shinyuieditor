import icon from "../../../assets/icons/shinyContainer.png";
import { DropWatcherPanel } from "../../../DragAndDropHelpers/DropWatcherPanel";
import { mergeClasses } from "../../../utils/mergeClasses";
import { nodeInfoFactory } from "../../nodeInfoFactory";
import type { ShinyUiNode, UiNodeComponent } from "../../uiNodeTypes";

import { BsIcon } from "./BsIcon";
import { IconSelector } from "./IconSelector";
import styles from "./ValueBox.module.css";

type ValueBoxArgs = {
  title: string;
  showcase_icon: string;
  value: ShinyUiNode;
  showcase_layout?: "left" | "right";
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
          {/* <CardChildrenWithDropNodes
          uiChildren={uiChildren}
          path={path}
          parentUiName="bslib::value_box"
        /> */}
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
      inputType: "omitted",
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
  iconSrc: icon,
  category: "Cards",
  description: "Colorful box to display a value",
});
