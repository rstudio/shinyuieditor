import textInputIcon from "assets/icons/shinyTextinput.png";
import type { CSSMeasure } from "CSSMeasure";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyTextInputSettings } from "./SettingsPanel";
import ShinyTextInput from "./ShinyTextInput";

export type ShinyTextInputProps = {
  inputId: string;
  label: string;
  value: string;
  placeholder?: string;
  width?: CSSMeasure;
};

export const textInputDefaultSettings: ShinyTextInputProps = {
  inputId: "myTextInput",
  label: "Text Input",
  value: "",
};

export const shinyTextInputInfo: UiComponentInfo<ShinyTextInputProps> = {
  title: "Text Input",
  UiComponent: ShinyTextInput,
  SettingsComponent: ShinyTextInputSettings,
  acceptsChildren: false,
  defaultSettings: textInputDefaultSettings,
  iconSrc: textInputIcon,
  category: "Inputs",
  infoPopup: "Create an input control for entry of unstructured text values.",
};
