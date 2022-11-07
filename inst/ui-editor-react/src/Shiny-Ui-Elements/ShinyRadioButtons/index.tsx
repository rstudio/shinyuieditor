import radioButtonIcons from "assets/icons/shinyRadiobuttons.png";
import type { CSSMeasure } from "components/Inputs/CSSUnitInput/CSSMeasure";
import type { NamedList } from "components/Inputs/ListInput/NamedListInput";
import {
  makeInputIdInfo,
  makeLabelInputInfo,
} from "Shiny-Ui-Elements/commonSettingsTemplates";

import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyRadioButtons from "./ShinyRadioButtons";

export type ShinyRadioButtonsProps = {
  inputId: string;
  label: string;
  choices: NamedList;
  width?: CSSMeasure;
};

export const shinyRadioButtonsInfo: UiComponentInfo<ShinyRadioButtonsProps> = {
  title: "Radio Buttons",
  UiComponent: ShinyRadioButtons,
  settingsInfo: {
    inputId: makeInputIdInfo("myRadioButtons"),
    label: makeLabelInputInfo("Radio Buttons"),
    choices: {
      label: "Choices",
      inputType: "list",
      defaultValue: {
        "choice a": "a",
        "choice b": "b",
      },
    },
    width: {
      inputType: "cssMeasure",
      label: "Width",
      defaultValue: "100%",
      units: ["%", "px", "rem"],
      optional: true,
      useDefaultIfOptional: true,
    },
  },
  acceptsChildren: false,
  iconSrc: radioButtonIcons,
  category: "Inputs",
  description:
    "Create a set of radio buttons used to select an item from a list.",
};
