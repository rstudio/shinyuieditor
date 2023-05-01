import type { CSSMeasure } from "../inputFieldTypes";
import type { NamedList } from "../NamedList";
import { nodeInfoFactory } from "../nodeInfoFactory";

export const input_checkbox_group = nodeInfoFactory<{
  inputId: string;
  label: string;
  choices: NamedList;
  width?: CSSMeasure;
}>()({
  id: "checkboxGroupInput",
  r_info: {
    fn_name: "checkboxGroupInput",
    package: "shiny",
    input_bindings: {
      inputIdKey: "inputId",
    },
  },
  title: "Checkbox Group",
  takesChildren: false,
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
  category: "Inputs",
  description:
    "Create a group of checkboxes that can be used to toggle multiple choices independently. The server will receive the input as a character vector of the selected values.",
});
