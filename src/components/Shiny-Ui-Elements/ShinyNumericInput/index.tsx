import sliderIcon from "assets/icons/shinySlider.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyNumericInputSettings } from "./SettingsPanel";
import ShinyNumericInput from "./ShinyNumericInput";

// import { ShinySliderInputSettings } from "./SettingsPanel";
// import ShinySliderInput from "./ShinySliderInput";

export type ShinyNumericInputProps = {
  inputId: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
};

export const numericInputDefaultSettings: ShinyNumericInputProps = {
  inputId: "myNumericInput",
  label: "Numeric Input",
  value: 10,
};

export const shinyNumericInputInfo: UiComponentInfo<ShinyNumericInputProps> = {
  title: "Numeric Input",
  UiComponent: ShinyNumericInput,
  SettingsComponent: ShinyNumericInputSettings,
  acceptsChildren: false,
  defaultSettings: numericInputDefaultSettings,
  iconSrc: sliderIcon,
};
