import icon from "../../../assets/icons/shinyContainer.png";
import { DropWatcherPanel } from "../../../DragAndDropHelpers/DropWatcherPanel";
import { nodeInfoFactory } from "../../nodeInfoFactory";
import type { ShinyUiNode, UiNodeComponent } from "../../uiNodeTypes";

import { BsIcon } from "./BsIcon";
import { IconSelector } from "./IconSelector";
import styles from "./ValueBox.module.css";

type ValueBoxArgs = {
  title: string;
  showcase_icon: string;
  value: ShinyUiNode;
};

const ValueBox: UiNodeComponent<ValueBoxArgs, { TakesChildren: true }> = ({
  uiArguments,
  uiChildren,
  path,
  wrapperProps,
}) => {
  return (
    <div className={styles.container} {...wrapperProps}>
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
