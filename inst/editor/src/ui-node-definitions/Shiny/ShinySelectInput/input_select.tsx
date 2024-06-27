import selectBoxIcon from "../../../assets/icons/shinySelectbox.png";
import { namedListToItemTypeArray } from "../../../components/Inputs/ListInput/namedListUtils";
import type { CSSMeasure, NamedList } from "../../inputFieldTypes";
import { nodeInfoFactory } from "../../nodeInfoFactory";
import type { ShinyUiNode } from "../../ShinyUiNode";

import classes from "./styles.module.css";

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
  iconSrc: selectBoxIcon,
  category: "Inputs",
  description:
    "Create a select list that can be used to choose a single or multiple items from a list of values.",
  ui_component: ({ namedArgs, wrapperProps }) => {
    const choices = namedArgs.choices;
    const id = namedArgs.inputId;
    return (
      <div className={classes.container} {...wrapperProps}>
        <label htmlFor={id}>{namedArgs.label}</label>
        <select id={id}>
          {namedListToItemTypeArray(choices).map(({ key, value, id }, i) => (
            <option value={value} key={id}>
              {key}
            </option>
          ))}
        </select>
      </div>
    );
  },
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
