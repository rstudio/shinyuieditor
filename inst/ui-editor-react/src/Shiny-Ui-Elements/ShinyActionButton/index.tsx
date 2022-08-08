import buttonIcon from "assets/icons/shinyButton.png";
import type { CSSMeasure } from "CSSMeasure";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyActionButtonSettings } from "./SettingsPanel";
import ShinyActionButton from "./ShinyActionButton";

export type ShinyActionButtonProps = {
  inputId: string;
  label: string;
  width?: CSSMeasure;
};

export const shinyActionButtonInfo: UiComponentInfo<ShinyActionButtonProps> = {
  title: "Action Button",
  UiComponent: ShinyActionButton,
  SettingsComponent: ShinyActionButtonSettings,
  acceptsChildren: false,
  defaultSettings: { inputId: "myButton", label: "My Button" },
  iconSrc: buttonIcon,
  category: "Inputs",
};

export default ShinyActionButton;
