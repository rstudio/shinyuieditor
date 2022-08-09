import icon from "assets/icons/shinyCheckgroup.png";
import type { NamedList } from "components/Inputs/ListInput/NamedListInput";
import type { CSSMeasure } from "CSSMeasure";

import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyCheckboxGroupInputSettings from "./SettingsPanel";
import ShinyCheckboxGroupInput from "./ShinyCheckboxGroupInput";

export type ShinyCheckboxGroupInputProps = {
  inputId: string;
  label: string;
  choices: NamedList;
  width?: CSSMeasure;
};

export const checkboxGroupInputDefaultSettings: ShinyCheckboxGroupInputProps = {
  inputId: "myCheckboxGroup",
  label: "Checkbox Group",
  choices: {
    "choice a": "a",
    "choice b": "b",
  },
};

export const shinyCheckboxGroupInputInfo: UiComponentInfo<ShinyCheckboxGroupInputProps> =
  {
    title: "Checkbox Group",
    UiComponent: ShinyCheckboxGroupInput,
    SettingsComponent: ShinyCheckboxGroupInputSettings,
    acceptsChildren: false,
    defaultSettings: checkboxGroupInputDefaultSettings,
    iconSrc: icon,
    category: "Inputs",
    infoPopup:
      "Create a group of checkboxes that can be used to toggle multiple choices independently. The server will receive the input as a character vector of the selected values.",
  };
