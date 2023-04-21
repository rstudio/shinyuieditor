import type { CSSMeasure } from "../inputFieldTypes";
import { nodeInfoFactory } from "../nodeInfoFactory";

export const input_checkbox = nodeInfoFactory<{
  inputId: string;
  label: string;
  value: boolean;
  width?: CSSMeasure;
}>()({
  id: "checkboxInput",
  r_info: {
    fn_name: "checkboxInput",
    package: "shiny",
  },
  title: "Checkbox Input",
  takesChildren: false,
  settingsInfo: {
    inputId: {
      inputType: "string",
      label: "inputId",
      defaultValue: "myCheckboxInput",
    },
    label: {
      inputType: "string",
      label: "label",
      defaultValue: "Checkbox Input",
    },
    value: {
      inputType: "boolean",
      label: "Starting value",
      defaultValue: false,
    },
    width: {
      inputType: "cssMeasure",
      label: "Width",
      defaultValue: "100%",
      units: ["%", "px", "rem"],
      optional: true,
    },
  },
  serverBindings: {
    inputs: {
      inputIdKey: "inputId",
    },
  },
  category: "Inputs",
  description: "Create a checkbox that can be used to specify logical values.",
});