import type { CSSMeasure } from "../inputFieldTypes";
import type { NamedList } from "../NamedList";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type { ShinyUiNode } from "../ShinyUiNode";

export type ShinySelectInputProps = {
  inputId: string;
  label: string;
  choices: NamedList;
  // Right now we only have single-select select inputs
  selected?: string;
  width?: CSSMeasure;
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
      inputType: "id",
      inputOrOutput: "input",
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
    selected: {
      label: "Selected",
      inputType: "dropdown",
      defaultValue: (x) => {
        const choice_values = getChoiceValues(x);

        if (choice_values.length === 0) {
          return "First Value";
        }

        return choice_values[0];
      },
      choices: getChoiceValues,
      optional: true,
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
    "Create a select list that can be used to choose a single or multiple items from a list of values.",
});

function getChoiceValues(x: ShinyUiNode | undefined): string[] {
  if (x?.id !== "selectInput") {
    throw new Error(
      `Expected id to be selectInput, but got ${
        x?.id ?? "unknown type"
      } instead`
    );
  }

  return Object.values((x.namedArgs as ShinySelectInputProps).choices);
}
