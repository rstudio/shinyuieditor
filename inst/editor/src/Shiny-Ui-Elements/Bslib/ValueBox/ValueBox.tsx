import { value_box } from "ui-node-definitions/src/Bslib/value_box";

import icon from "../../../assets/icons/shinyValueBox.png";
import { PopoverButton } from "../../../components/Inputs/PopoverButton";
import { RadioInputs } from "../../../components/Inputs/RadioInputs/RadioInputsSimple";
import { InputLabelWrapper } from "../../../components/Inputs/SettingsFormBuilder/SettingsInput/SettingsInput";
import { DropWatcherPanel } from "../../../DragAndDropHelpers/DropWatcherPanel";
import { mergeClasses } from "../../../utils/mergeClasses";
import { ChildrenWithDropNodes } from "../../ChildrenWithDropNodes";
import type { UiComponentFromInfo } from "../../utils/add_editor_info_to_ui_node";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";

import { BsIcon } from "./BsIcon";
import { IconSelector } from "./IconSelector";
import styles from "./ValueBox.module.css";

const ValueBox: UiComponentFromInfo<typeof value_box> = ({
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
          <BsIcon icon_name={namedArgs.showcase_icon ?? "question-circle"} />
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
          <ChildrenWithDropNodes
            children={children}
            parentPath={path}
            parentid="value_box"
            messageOnHover="Add node to value box"
          />
        </div>
      </div>
    </div>
  );
};

export const bslibValueBoxInfo = addEditorInfoToUiNode(value_box, {
  iconSrc: icon,
  UiComponent: ValueBox,
  settingsFormRender: ({ settings, onSettingsChange, inputs }) => {
    return (
      <div>
        <InputLabelWrapper
          label={`Showcase ${settings.showcase_icon ? "Icon" : "Value"}`}
          labelId="showcase-icon"
          mainInput={
            settings.showcase_icon ? (
              <IconSelector
                initialValue={settings.showcase_icon}
                onIconSelect={(icon_name) => {
                  onSettingsChange?.("showcase_icon", {
                    type: "UPDATE",
                    value: icon_name,
                  });
                }}
              />
            ) : (
              <PopoverButton
                className={styles.replace_showcase_btn}
                use_markdown={true}
                popoverContent="Replace current showcase value with an icon from the
                  bsicons package."
                onClick={() => {
                  onSettingsChange?.("showcase_icon", {
                    type: "UPDATE",
                    value: "database",
                  });
                }}
              >
                Replace with icon
              </PopoverButton>
            )
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
});
