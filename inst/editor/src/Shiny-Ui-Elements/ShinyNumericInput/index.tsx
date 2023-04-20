import React from "react";

import { input_numeric } from "ui-node-definitions/src/Shiny/input_numeric";

import icon from "../../assets/icons/shinyNumericinput.png";
import { NumberInputSimple } from "../../components/Inputs/NumberInput/NumberInput";
import { LabeledInputCategory } from "../../components/Inputs/SettingsFormBuilder/LabeledInputCategory";
import { mergeClasses } from "../../utils/mergeClasses";
import type { UiComponent_from_info } from "../utils/add_editor_info_to_ui_node";
import { add_editor_info_to_ui_node } from "../utils/add_editor_info_to_ui_node";

import classes from "./styles.module.css";

const ShinyNumericInput: UiComponent_from_info<typeof input_numeric> = ({
  namedArgs,
  wrapperProps,
}) => {
  const settings = { ...namedArgs };

  const width = settings.width ?? "200px";

  const [value, setValue] = React.useState(settings.value);

  React.useEffect(() => {
    setValue(settings.value);
  }, [settings.value]);

  return (
    <div
      className={mergeClasses(classes.container, "numericInput")}
      style={{ width }}
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

export const shinyNumericInputInfo = add_editor_info_to_ui_node(input_numeric, {
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
