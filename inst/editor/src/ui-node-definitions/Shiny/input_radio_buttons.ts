import type { CSSMeasure } from "../inputFieldTypes";
import type { NamedList } from "../NamedList";
import { nodeInfoFactory } from "../nodeInfoFactory";

export const input_radio_buttons = nodeInfoFactory<{
  inputId: string;
  label: string;
  choices: NamedList;
  width?: CSSMeasure;
}>()({
  id: "radioButtons",
  r_info: {
    fn_name: "radioButtons",
    package: "shiny",
    input_bindings: true,
  },
  py_info: {
    fn_name: "ui.input_radio_buttons",
    package: "shiny",
    input_bindings: true,
  },
  title: "Radio Buttons",
  takesChildren: false,
  settingsInfo: {
    inputId: {
      inputType: "id",
      inputOrOutput: "input",
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
  category: "Inputs",
  description:
    "Create a set of radio buttons used to select an item from a list.",
});
