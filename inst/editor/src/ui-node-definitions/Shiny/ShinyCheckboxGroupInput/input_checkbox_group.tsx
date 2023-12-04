import icon from "../../../assets/icons/shinyCheckgroup.png";
import { namedListToItemTypeArray } from "../../../components/Inputs/ListInput/namedListUtils";
import type { CSSMeasure, NamedList } from "../../inputFieldTypes";
import { nodeInfoFactory } from "../../nodeInfoFactory";

import classes from "./styles.module.css";

export type ShinyCheckboxGroupInputProps = {
  inputId: string;
  label: string;
  choices: NamedList;
  width?: CSSMeasure;
};

export const input_checkbox_group =
  nodeInfoFactory<ShinyCheckboxGroupInputProps>()({
    id: "checkboxGroupInput",
    r_info: {
      fn_name: "checkboxGroupInput",
      package: "shiny",
      input_bindings: true,
    },
    py_info: {
      fn_name: "ui.input_checkbox_group",
      package: "shiny",
      input_bindings: true,
    },
    title: "Checkbox Group",
    takesChildren: false,
    settingsInfo: {
      inputId: {
        inputType: "id",
        inputOrOutput: "input",
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
    iconSrc: icon,
    category: "Inputs",
    description:
      "Create a group of checkboxes that can be used to toggle multiple choices independently. The server will receive the input as a character vector of the selected values.",
    ui_component: ({ namedArgs, wrapperProps }) => {
      const choices = namedArgs.choices;
      return (
        <div
          className={classes.container}
          style={{ width: namedArgs.width }}
          {...wrapperProps}
        >
          <label>{namedArgs.label}</label>
          <div>
            {namedListToItemTypeArray(choices).map(({ key, value, id }, i) => (
              <div key={id}>
                <label className={classes.checkbox}>
                  <input
                    type="checkbox"
                    name={value}
                    value={value}
                    defaultChecked={i === 0}
                  />
                  <span>{key}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    },
  });
