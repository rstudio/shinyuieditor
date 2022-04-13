import sliderIcon from "assets/icons/shinySlider.png";
import type { CSSMeasure } from "CSSMeasure";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinySliderInputSettings } from "./SettingsPanel";
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
  SettingsComponent: ShinySliderInputSettings,
  acceptsChildren: false,
  defaultSettings: sliderDefaultSettings,
  iconSrc: sliderIcon,
};

export default ShinySliderInput;
