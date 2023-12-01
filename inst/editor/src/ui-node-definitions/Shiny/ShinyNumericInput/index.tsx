import React from "react";

import { NumberInputSimple } from "../../../components/Inputs/NumberInput/NumberInput";
import { LabeledInputCategory } from "../../../SettingsPanel/LabeledInputCategory";
import { mergeClasses } from "../../../utils/mergeClasses";
import icon from "../../assets/icons/shinyNumericinput.png";
import type { UiComponentFromInfo } from "../../utils/add_editor_info_to_ui_node";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";
import { input_numeric } from "../input_numeric";

import classes from "./styles.module.css";

const ShinyNumericInput: UiComponentFromInfo<typeof input_numeric> = ({
  namedArgs,
  wrapperProps,
}) => {
  const settings = { ...namedArgs };

  const [value, setValue] = React.useState(settings.value);

  React.useEffect(() => {
    setValue(settings.value);
  }, [settings.value]);

  return (
    <div
      className={mergeClasses(classes.container, "numericInput")}
      style={{
        width: settings.width ?? "200px",
        // If we're using the default width, don't let it go over the width of its container
        maxWidth: settings.width ? undefined : "100%",
      }}
      {...wrapperProps}
    >
      <span>{settings.label}</span>
      <NumberInputSimple
        type="number"
        value={value}
        onChange={setValue}
        min={settings.min}
        max={settings.max}
        step={settings.step}
      />
    </div>
  );
};

export const shinyNumericInputInfo = addEditorInfoToUiNode(input_numeric, {
  iconSrc: icon,
  UiComponent: ShinyNumericInput,
  settingsFormRender: ({ inputs }) => {
    return (
      <>
        {inputs.inputId}
        {inputs.label}
        <LabeledInputCategory label="Values">
          {inputs.min}
          {inputs.max}
          {inputs.value}
          {inputs.step}
        </LabeledInputCategory>
        {inputs.width}
      </>
    );
  },
});
