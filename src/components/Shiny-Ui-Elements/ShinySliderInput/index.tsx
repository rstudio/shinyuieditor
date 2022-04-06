import sliderIcon from "assets/icons/shinySlider.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinySliderInputSettings } from "./SettingsPanel";
import ShinySliderInput from "./ShinySliderInput";

export type ShinySliderInputProps = {
  inputId: string;
  label: string;
  min: number;
  value: number;
  max: number;
};

export const sliderDefaultSettings: ShinySliderInputProps = {
  inputId: "mySlider",
  label: "slider input",
  min: 0,
  max: 10,
  value: 5,
};

export function validateNumber(x?: string | number) {
  if (typeof x === "number") return x;

  const parsed = Number(x);

  if (isNaN(parsed)) return undefined;

  return parsed;
}

export const shinySliderInputInfo: UiComponentInfo<ShinySliderInputProps> = {
  title: "Slider Input",
  UiComponent: ShinySliderInput,
  SettingsComponent: ShinySliderInputSettings,
  acceptsChildren: false,
  defaultSettings: {
    inputId: "slider",
    label: "Slider",
    min: 0,
    value: 5,
    max: 10,
  },
  iconSrc: sliderIcon,
};

export default ShinySliderInput;
