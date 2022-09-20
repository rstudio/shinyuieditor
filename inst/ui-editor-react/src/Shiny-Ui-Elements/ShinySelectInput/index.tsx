import selectBoxIcon from "assets/icons/shinySelectbox.png";
import type { NamedList } from "components/Inputs/ListInput/NamedListInput";
import {
  makeInputIdInfo,
  makeLabelInputInfo,
} from "Shiny-Ui-Elements/commonSettingsTemplates";

import type { UiComponentInfo } from "../uiNodeTypes";

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
  settingsInfo: {
    inputId: makeInputIdInfo("mySelectInput"),
    label: makeLabelInputInfo("Select Input"),
    choices: {
      label: "Choices",
      inputType: "list",
      defaultValue: {
        "choice a": "a",
        "choice b": "b",
      },
    },
  },
  acceptsChildren: false,
  defaultSettings: selectInputDefaultSettings,
  iconSrc: selectBoxIcon,
  category: "Inputs",
  description:
    "Create a select list that can be used to choose a single or multiple items from a list of values.",
};
