import icon from "../../assets/icons/shinyCheckgroup.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import type { NamedList } from "../../components/Inputs/ListInput/NamedListInput";
import { nodeInfoFactory } from "../nodeInfoFactory";

import ShinyCheckboxGroupInput from "./ShinyCheckboxGroupInput";

export type ShinyCheckboxGroupInputProps = {
  inputId: string;
  label: string;
  choices: NamedList;
  width?: CSSMeasure;
};

export const shinyCheckboxGroupInputInfo =
  nodeInfoFactory<ShinyCheckboxGroupInputProps>()({
    id: "checkboxGroupInput",
    r_info: {
      fn_name: "checkboxGroupInput",
      package: "shiny",
    },
    title: "Checkbox Group",
    takesChildren: false,
    UiComponent: ShinyCheckboxGroupInput,
    settingsInfo: {
      inputId: {
        inputType: "string",
        label: "inputId",
        defaultValue: "myCheckboxGroup",
      },
      label: {
        inputType: "string",
        label: "label",
        defaultValue: "Checkbox Group",
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
      "Create a group of checkboxes that can be used to toggle multiple choices independently. The server will receive the input as a character vector of the selected values.",
  });
