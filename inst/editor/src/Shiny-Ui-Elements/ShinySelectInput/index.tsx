import selectBoxIcon from "../../assets/icons/shinySelectbox.png";
import type { NamedList } from "../../components/Inputs/ListInput/NamedListInput";
import { nodeInfoFactory } from "../nodeInfoFactory";

import ShinySelectInput from "./ShinySelectInput";

export type ShinySelectInputProps = {
  inputId: string;
  label: string;
  choices: NamedList;
};

export const shinySelectInputInfo = nodeInfoFactory<ShinySelectInputProps>()({
  library: "shiny",
  name: "selectInput",
  title: "Select Input",
  UiComponent: ShinySelectInput,
  settingsInfo: {
    inputId: {
      inputType: "string",
      label: "inputId",
      defaultValue: "mySelectInput",
    },
    label: {
      inputType: "string",
      label: "label",
      defaultValue: "Select Input",
    },
    choices: {
      label: "Choices",
      inputType: "list",
      defaultValue: {
        "choice a": "a",
        "choice b": "b",
      },
    },
  },
  serverBindings: {
    inputs: {
      inputIdKey: "inputId",
    },
  },
  iconSrc: selectBoxIcon,
  category: "Inputs",
  description:
    "Create a select list that can be used to choose a single or multiple items from a list of values.",
});
