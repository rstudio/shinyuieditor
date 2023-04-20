import React from "react";

import { input_radio_buttons } from "ui-node-definitions/src/Shiny/input_radio_buttons";

import icon from "../../assets/icons/shinyRadioButtons.png";
import type { UiComponent_from_info } from "../add_editor_info_to_ui_node";
import { add_editor_info_to_ui_node } from "../add_editor_info_to_ui_node";

import classes from "./styles.module.css";

const ShinyRadioButtons: UiComponent_from_info<typeof input_radio_buttons> = ({
  namedArgs,
  wrapperProps,
}) => {
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
    <div
      className={classes.container}
      style={{ width: namedArgs.width }}
      {...wrapperProps}
    >
      <label>{namedArgs.label}</label>
      <div>
        {values.map((value, i) => (
          <div className={classes.radio} key={value}>
            <label>
              <input
                type="radio"
                name={namedArgs.inputId}
                value={value}
                onChange={(x) => setSelection(x.target.value)}
                checked={value === selection}
              />
              <span>{keys[i]}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export const shinyRadioButtonsInfo = add_editor_info_to_ui_node(
  input_radio_buttons,
  {
    UiComponent: ShinyRadioButtons,
    iconSrc: icon,
  }
);
