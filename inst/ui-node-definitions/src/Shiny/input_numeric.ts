import type { CSSMeasure } from "../inputFieldTypes";
import { nodeInfoFactory } from "../nodeInfoFactory";

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
      inputType: "string",
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
});
