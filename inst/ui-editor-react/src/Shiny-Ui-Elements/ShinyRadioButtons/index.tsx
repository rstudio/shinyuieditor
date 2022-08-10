import radioButtonIcons from "assets/icons/shinyRadiobuttons.png";
import type { NamedList } from "components/Inputs/ListInput/NamedListInput";
import type { CSSMeasure } from "CSSMeasure";

import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyRadioButtonsSettings from "./SettingsPanel";
import ShinyRadioButtons from "./ShinyRadioButtons";

export type ShinyRadioButtonsProps = {
  inputId: string;
  label: string;
  choices: NamedList;
  width?: CSSMeasure;
};

export const radioButtonsDefaultSettings: ShinyRadioButtonsProps = {
  inputId: "myRadioButtons",
  label: "Radio Buttons",
  choices: {
    "choice a": "a",
    "choice b": "b",
  },
};

export const shinyRadioButtonsInfo: UiComponentInfo<ShinyRadioButtonsProps> = {
  title: "Radio Buttons",
  UiComponent: ShinyRadioButtons,
  SettingsComponent: ShinyRadioButtonsSettings,
  acceptsChildren: false,
  defaultSettings: radioButtonsDefaultSettings,
  iconSrc: radioButtonIcons,
  category: "Inputs",
  infoPopup:
    "Create a set of radio buttons used to select an item from a list.",
};
