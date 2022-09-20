import sliderIcon from "assets/icons/shinySlider.png";
import type { CSSMeasure } from "components/Inputs/CSSUnitInput/CSSMeasure";
import {
  inputIdInfo,
  optionalWidthInfo,
} from "Shiny-Ui-Elements/commonSettingsTemplates";

import type { UiComponentInfo } from "../uiNodeTypes";

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

export const sliderDefaultSettings: ShinySliderInputProps = {
  inputId: "mySlider",
  label: "Slider Input",
  min: 0,
  max: 10,
  value: 5,
  width: "100%",
};

export const shinySliderInputInfo: UiComponentInfo<ShinySliderInputProps> = {
  title: "Slider Input",
  UiComponent: ShinySliderInput,
  settingsInfo: {
    inputId: inputIdInfo,
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
    width: optionalWidthInfo,
  },
  acceptsChildren: false,
  defaultSettings: sliderDefaultSettings,
  iconSrc: sliderIcon,
  category: "Inputs",
  description:
    "Constructs a slider widget to select a number from a range. _(Dates and date-times not currently supported.)_",
};

export default ShinySliderInput;
