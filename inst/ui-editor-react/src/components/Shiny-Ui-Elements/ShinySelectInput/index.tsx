import selectBoxIcon from "assets/icons/shinySelectbox.png";
import type { NamedList } from "components/Inputs/ListInput/NamedListInput";

import type { UiComponentInfo } from "../uiNodeTypes";

import ShinySelectInputSettings from "./SettingsPanel";
import ShinySelectInput from "./ShinySelectInput";

export type ShinySelectInputProps = {
  inputId: string;
  label: string;
  choices: NamedList;
};

export const selectInputDefaultSettings: ShinySelectInputProps = {
  inputId: "mySelectInput",
  label: "Select Input",
  choices: {
    "choice a": "a",
    "choice b": "b",
  },
};

export const shinySelectInputInfo: UiComponentInfo<ShinySelectInputProps> = {
  title: "Select Input",
  UiComponent: ShinySelectInput,
  SettingsComponent: ShinySelectInputSettings,
  acceptsChildren: false,
  defaultSettings: selectInputDefaultSettings,
  iconSrc: selectBoxIcon,
};
