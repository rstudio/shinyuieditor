import type { CSSMeasure } from "../inputFieldTypes";
import { nodeInfoFactory } from "../nodeInfoFactory";

export const input_slider = nodeInfoFactory<{
  inputId: string;
  label: string;
  min: number;
  value: number;
  max: number;
  step?: number;
  width?: CSSMeasure;
}>()({
  id: "sliderInput",
  r_info: {
    fn_name: "sliderInput",
    package: "shiny",
  },
  py_info: {
    fn_name: "ui.input_slider",
    package: "shiny",
  },
  title: "Slider Input",
  takesChildren: false,
  settingsInfo: {
    inputId: {
      label: "Input ID",
      inputType: "string",
      defaultValue: "inputId",
      // Here we note that the python version of this function has a different argument for the input ID
      py_name: "id",
    },
    label: {
      label: "Label text",
      inputType: "string",
      defaultValue: "Slider Input",
    },
    min: {
      label: "Min",
      inputType: "number",
      defaultValue: 0,
    },
    max: {
      label: "Max",
      inputType: "number",
      defaultValue: 10,
    },
    value: {
      label: "Start",
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
      useDefaultIfOptional: true,
    },
  },

  serverBindings: {
    inputs: {
      inputIdKey: "inputId",
    },
  },
  category: "Inputs",
  description:
    "Constructs a slider widget to select a number from a range. _(Dates and date-times not currently supported.)_",
});