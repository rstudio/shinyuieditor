import icon from "assets/icons/shinyCheckgroup.png";
import type { CSSMeasure } from "components/Inputs/CSSUnitInput/CSSMeasure";
import type { NamedList } from "components/Inputs/ListInput/NamedListInput";
import {
  makeInputIdInfo,
  makeLabelInputInfo,
} from "Shiny-Ui-Elements/commonSettingsTemplates";

import type { UiComponentInfo } from "../uiNodeTypes";

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
    settingsInfo: {
      inputId: makeInputIdInfo("myCheckboxGroup"),
      label: makeLabelInputInfo("Checkbox Group"),
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
    defaultSettings: checkboxGroupInputDefaultSettings,
    iconSrc: icon,
    category: "Inputs",
    description:
      "Create a group of checkboxes that can be used to toggle multiple choices independently. The server will receive the input as a character vector of the selected values.",
  };
