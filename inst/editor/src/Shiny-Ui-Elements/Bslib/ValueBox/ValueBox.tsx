import type { CSSProperties } from "react";

import icon from "../../../assets/icons/shinyValueBox.png";
import { PopoverButton } from "../../../components/Inputs/PopoverButton";
import { RadioInputs } from "../../../components/Inputs/RadioInputs/RadioInputsSimple";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/PopoverEl/FloatingPopover";
import { DropWatcherPanel } from "../../../DragAndDropHelpers/DropWatcherPanel";
import { InputLabelWrapper } from "../../../SettingsPanel/SettingsInput/SettingsInput";
import { value_box } from "../../../ui-node-definitions/Bslib/value_box";
import { mergeClasses } from "../../../utils/mergeClasses";
import { ChildrenWithDropNodes } from "../../ChildrenWithDropNodes";
import type { UiComponentFromInfo } from "../../utils/add_editor_info_to_ui_node";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";

import { BsIcon } from "./BsIcon";
import { IconSelector } from "./IconSelector";

const ValueBox: UiComponentFromInfo<typeof value_box> = ({
  namedArgs,
  children,
  path,
  wrapperProps,
}) => {
  const showcase_right = namedArgs.showcase_layout === "right";
  return (
    <div
      className="flex-1 relative"
      style={
        {
          "--font-color": "var(--rstudio-white",
          "--selected-outline-color": "black",
        } as CSSProperties
      }
      {...wrapperProps}
    >
      <div
        className={mergeClasses(
          "bg-primary text-white h-100 grid gap-md p-md overflow-auto",
          showcase_right ? "grid-cols-[7fr_3fr]" : "grid-cols-[3fr_7fr]"
        )}
      >
        <div
          className={mergeClasses(
            "p-sm col-start-1 row-start-1 min-w-0",
            showcase_right ? "col-start-2" : "col-start-1"
          )}
        >
          <BsIcon
            className="w-100 h-100"
            icon_name={namedArgs.showcase_icon ?? "question-circle"}
          />
        </div>
        <div
          className={mergeClasses(
            "flex flex-col justify-center row-start-1 min-w-0",
            showcase_right ? "col-start-1" : "col-start-2"
          )}
        >
          <h5 className="">{namedArgs.title}</h5>
          <div>
            <DropWatcherPanel
              className={
                namedArgs.value?.id === "textNode" ? "text-[1.5rem]" : ""
              }
              existing_node={namedArgs.value}
              child_loc={"value"}
              parentPath={path}
              visibleWhenEmpty={true}
              messageOnHover={
                namedArgs.value ? "Replace value" : "Drop a value node here"
              }
              placeHolder={<EmptyValuePlaceholder />}
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

function EmptyValuePlaceholder() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="opacity-70 italic h-10 border grid place-content-center">
          No value present
        </div>
      </TooltipTrigger>
      <TooltipContent>
        Drag content here to set the value box's main value field.
      </TooltipContent>
    </Tooltip>
  );
}

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
                className="w-100 h-[25px]"
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
