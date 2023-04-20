import type { CSSMeasure } from "../inputFieldTypes";
import { nodeInfoFactory } from "../nodeInfoFactory";

export const input_text = nodeInfoFactory<{
  inputId: string;
  label: string;
  value: string;
  placeholder?: string;
  width?: CSSMeasure;
}>()({
  id: "textInput",
  r_info: {
    fn_name: "textInput",
    package: "shiny",
  },
  title: "Text Input",
  takesChildren: false,
  settingsInfo: {
    inputId: {
      inputType: "string",
      label: "inputId",
      defaultValue: "myTextInput",
    },
    label: {
      inputType: "string",
      label: "label",
      defaultValue: "Text Input",
    },
    value: {
      inputType: "string",
      label: "Starting text",
      defaultValue: "",
    },
    placeholder: {
      inputType: "string",
      label: "Empty input placeholder",
      defaultValue: "placeholder text",
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
  serverBindings: {
    inputs: {
      inputIdKey: "inputId",
    },
  },
  category: "Inputs",
  description: "Create an input control for entry of unstructured text values.",
});
