import icon from "../../assets/icons/shinyNumericinput.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import { LabeledInputCategory } from "../../components/Inputs/SettingsFormBuilder/LabeledInputCategory";
import {
  makeInputIdInfo,
  makeLabelInputInfo,
} from "../commonSettingsTemplates";
import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyNumericInput from "./ShinyNumericInput";

export type ShinyNumericInputProps = {
  inputId: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  width?: CSSMeasure;
};

export const shinyNumericInputInfo: UiComponentInfo<ShinyNumericInputProps> = {
  title: "Numeric Input",
  UiComponent: ShinyNumericInput,
  settingsInfo: {
    inputId: makeInputIdInfo("myNumericInput"),
    label: makeLabelInputInfo("Numeric Input"),
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
  acceptsChildren: false,
  iconSrc: icon,
  category: "Inputs",
  description: "An input control for entry of numeric values",
};
