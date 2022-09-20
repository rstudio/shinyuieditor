import textInputIcon from "assets/icons/shinyTextinput.png";
import type { CSSMeasure } from "components/Inputs/CSSUnitInput/CSSMeasure";
import { inputIdInfo } from "Shiny-Ui-Elements/commonSettingsTemplates";

import type { UiComponentInfo } from "../uiNodeTypes";

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
  settingsInfo: {
    inputId: inputIdInfo,
  },
  acceptsChildren: false,
  defaultSettings: textInputDefaultSettings,
  iconSrc: textInputIcon,
  category: "Inputs",
  description: "Create an input control for entry of unstructured text values.",
};
