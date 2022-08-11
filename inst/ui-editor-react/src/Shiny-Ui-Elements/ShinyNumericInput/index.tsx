import numericInputIcon from "assets/icons/shinyNumericinput.png";
import type { CSSMeasure } from "CSSMeasure";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyNumericInputSettings } from "./SettingsPanel";
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
  iconSrc: numericInputIcon,
  category: "Inputs",
  description: "An input control for entry of numeric values",
};
