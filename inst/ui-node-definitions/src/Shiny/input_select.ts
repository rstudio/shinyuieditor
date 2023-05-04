import type { NamedList } from "../NamedList";
import { nodeInfoFactory } from "../nodeInfoFactory";

export type ShinySelectInputProps = {
  inputId: string;
  label: string;
  choices: NamedList;
};

export const input_select = nodeInfoFactory<ShinySelectInputProps>()({
  id: "selectInput",
  r_info: {
    fn_name: "selectInput",
    package: "shiny",
    input_bindings: true,
  },
  py_info: {
    fn_name: "ui.input_select",
    package: "shiny",
    input_bindings: true,
  },
  title: "Select Input",
  takesChildren: false,
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
  category: "Inputs",
  description:
    "Create a select list that can be used to choose a single or multiple items from a list of values.",
});
