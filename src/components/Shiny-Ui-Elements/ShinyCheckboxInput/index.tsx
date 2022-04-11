import inputIcon from "assets/icons/shinycheckbox.png";
import type { CSSMeasure } from "CSSMeasure";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyCheckboxInputSettings } from "./SettingsPanel";
import ShinyCheckboxInput from "./ShinyCheckboxInput";

export type ShinyCheckboxInputProps = {
  inputId: string;
  label: string;
  value: boolean;
  width?: CSSMeasure;
};

export const checkboxInputDefaultSettings: ShinyCheckboxInputProps = {
  inputId: "myCheckboxInput",
  label: "Checkbox Input",
  value: false,
};

export const shinyCheckboxInputInfo: UiComponentInfo<ShinyCheckboxInputProps> =
  {
    title: "Checkbox Input",
    UiComponent: ShinyCheckboxInput,
    SettingsComponent: ShinyCheckboxInputSettings,
    acceptsChildren: false,
    defaultSettings: checkboxInputDefaultSettings,
    iconSrc: inputIcon,
  };
