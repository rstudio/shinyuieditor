import icon from "../../assets/icons/shinyRadioButtons.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import type { NamedList } from "../../components/Inputs/ListInput/NamedListInput";
import { nodeInfoFactory } from "../nodeInfoFactory";

import ShinyRadioButtons from "./ShinyRadioButtons";

export type ShinyRadioButtonsProps = {
  inputId: string;
  label: string;
  choices: NamedList;
  width?: CSSMeasure;
};

export const shinyRadioButtonsInfo = nodeInfoFactory<ShinyRadioButtonsProps>()({
  r_package: "shiny",
  r_fn_name: "radioButtons",
  title: "Radio Buttons",
  takesChildren: false,
  UiComponent: ShinyRadioButtons,
  settingsInfo: {
    inputId: {
      inputType: "string",
      label: "inputId",
      defaultValue: "myRadioButtons",
    },
    label: {
      inputType: "string",
      label: "label",
      defaultValue: "Radio Buttons",
    },
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
  serverBindings: {
    inputs: {
      inputIdKey: "inputId",
    },
  },
  iconSrc: icon,
  category: "Inputs",
  description:
    "Create a set of radio buttons used to select an item from a list.",
});
