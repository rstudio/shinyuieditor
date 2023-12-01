import React from "react";

import { NumberInputSimple } from "../../../components/Inputs/NumberInput/NumberInput";
import { LabeledInputCategory } from "../../../SettingsPanel/LabeledInputCategory";
import { mergeClasses } from "../../../utils/mergeClasses";
import icon from "../../assets/icons/shinyNumericinput.png";
import type { CSSMeasure } from "../../inputFieldTypes";
import { nodeInfoFactory } from "../../nodeInfoFactory";

import classes from "./styles.module.css";

export const input_numeric = nodeInfoFactory<{
  inputId: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  width?: CSSMeasure;
}>()({
  id: "numericInput",
  r_info: {
    fn_name: "numericInput",
    package: "shiny",
    input_bindings: true,
  },
  py_info: {
    fn_name: "ui.input_numeric",
    package: "shiny",
    input_bindings: true,
  },
  title: "Numeric Input",
  takesChildren: false,
  settingsInfo: {
    inputId: {
      inputType: "id",
      inputOrOutput: "input",
      label: "inputId",
      defaultValue: "myNumericInput",
    },
    label: {
      inputType: "string",
      label: "label",
      defaultValue: "Numeric Input",
    },
    min: {
      label: "Min",
      inputType: "number",
      defaultValue: 0,
      optional: true,
    },
    max: {
      label: "Max",
      inputType: "number",
      defaultValue: 10,
      optional: true,
    },
    value: {
      label: "Start value",
      inputType: "number",
      defaultValue: 5,
    },
    step: {
      inputType: "number",
      label: "Step size",
      defaultValue: 1,
      optional: true,
    },
    width: {
      inputType: "cssMeasure",
      label: "Width",
      defaultValue: "100%",
      units: ["%", "px", "rem"],
      optional: true,
    },
  },
  category: "Inputs",
  description: "An input control for entry of numeric values",
  ui_component: ({ namedArgs, wrapperProps }) => {
    const settings = { ...namedArgs };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState(settings.value);

    // eslint-disable-next-line react-hooks/rules-of-hooks
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
  },
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
  iconSrc: icon,
});
