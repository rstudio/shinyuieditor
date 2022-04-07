import radioButtonIcons from "assets/icons/shinyRadioButtons.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyRadioButtonsSettings from "./SettingsPanel";
import ShinyRadioButtons from "./ShinyRadioButtons";

export type ShinyRadioButtonsProps = {
  inputId: string;
  label: string;
  choices: string[];
};

export const radioButtonsDefaultSettings: ShinyRadioButtonsProps = {
  inputId: "myRadioButtons",
  label: "Radio Buttons",
  choices: ["choice a", "choice b"],
};

export const shinyRadioButtonsInfo: UiComponentInfo<ShinyRadioButtonsProps> = {
  title: "Radio Buttons",
  UiComponent: ShinyRadioButtons,
  SettingsComponent: ShinyRadioButtonsSettings,
  acceptsChildren: false,
  defaultSettings: radioButtonsDefaultSettings,
  iconSrc: radioButtonIcons,
};
