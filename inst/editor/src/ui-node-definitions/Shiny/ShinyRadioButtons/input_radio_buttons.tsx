import React from "react";

import icon from "../../../assets/icons/shinyRadioButtons.png";
import type { CSSMeasure, NamedList } from "../../inputFieldTypes";
import type { UiNodeComponent } from "../../nodeInfoFactory";
import { nodeInfoFactory } from "../../nodeInfoFactory";

type RadioButtonsArgs = {
  inputId: string;
  label: string;
  choices: NamedList;
  width?: CSSMeasure;
};
const RadioButtonsComponent: UiNodeComponent<
  RadioButtonsArgs,
  { TakesChildren: false }
> = ({ namedArgs, wrapperProps }) => {
  const choices = namedArgs.choices;
  const keys = Object.keys(choices);
  const values = Object.values(choices);

  const [selection, setSelection] = React.useState<string>(values[0]);

  React.useEffect(() => {
    // If the user changes the value of the currently selected element, just
    // reset selection to the first element
    if (!values.includes(selection)) {
      setSelection(values[0]);
    }
  }, [selection, values]);

  return (
    <div className="p-1" style={{ width: namedArgs.width }} {...wrapperProps}>
      <label>{namedArgs.label}</label>
      <div className="flex flex-col pt-1">
        {values.map((value, i) => (
          <label className="flex items-center gap-1" key={value}>
            <input
              type="radio"
              name={namedArgs.inputId}
              value={value}
              onChange={(x) => setSelection(x.target.value)}
              checked={value === selection}
            />
            <span>{keys[i]}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export const input_radio_buttons = nodeInfoFactory<RadioButtonsArgs>()({
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
  iconSrc: icon,
  category: "Inputs",
  description:
    "Create a set of radio buttons used to select an item from a list.",
  ui_component: RadioButtonsComponent,
});
