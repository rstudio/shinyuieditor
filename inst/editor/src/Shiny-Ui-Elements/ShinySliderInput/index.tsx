import sliderIcon from "../../assets/icons/shinySlider.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import { LabeledInputCategory } from "../../components/Inputs/SettingsFormBuilder/LabeledInputCategory";
import { nodeInfoFactory } from "../nodeInfoFactory";

import ShinySliderInput from "./ShinySliderInput";

export type ShinySliderInputProps = {
  inputId: string;
  label: string;
  min: number;
  value: number;
  max: number;
  step?: number;
  width?: CSSMeasure;
};

export const shinySliderInputInfo = nodeInfoFactory<ShinySliderInputProps>()({
  id: "sliderInput",
  r_info: {
    fn_name: "sliderInput",
    package: "shiny",
  },
  py_info: {
    fn_name: "ui.input_slider",
    package: "shiny",
    transform_named_args: ({ inputId, ...args }) => {
      return {
        id: inputId,
        ...args,
      };
    },
  },
  title: "Slider Input",
  takesChildren: false,
  UiComponent: ShinySliderInput,
  settingsInfo: {
    inputId: {
      label: "Input ID",
      inputType: "string",
      defaultValue: "inputId",
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
  serverBindings: {
    inputs: {
      inputIdKey: "inputId",
    },
  },
  iconSrc: sliderIcon,
  category: "Inputs",
  description:
    "Constructs a slider widget to select a number from a range. _(Dates and date-times not currently supported.)_",
});
export default ShinySliderInput;
