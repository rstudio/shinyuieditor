import inputIcon from "assets/icons/shinycheckbox.png";
import type { CSSMeasure } from "components/Inputs/CSSUnitInput/CSSMeasure";
import {
  makeInputIdInfo,
  makeLabelInputInfo,
  requiredWidthInfo,
} from "Shiny-Ui-Elements/commonSettingsTemplates";

import type { UiComponentInfo } from "../uiNodeTypes";

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
    settingsInfo: {
      inputId: makeInputIdInfo("myCheckboxInput"),
      label: makeLabelInputInfo("Checkbox Input"),
      value: {
        inputType: "boolean",
        label: "Starting value",
        defaultValue: false,
      },
      width: requiredWidthInfo,
    },
    acceptsChildren: false,
    defaultSettings: checkboxInputDefaultSettings,
    iconSrc: inputIcon,
    category: "Inputs",
    description:
      "Create a checkbox that can be used to specify logical values.",
  };
