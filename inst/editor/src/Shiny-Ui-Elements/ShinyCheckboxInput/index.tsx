import React from "react";

import { input_checkbox } from "ui-node-definitions/src/Shiny/input_checkbox";

import icon from "../../assets/icons/shinycheckbox.png";
import type { UiComponent_from_info } from "../utils/add_editor_info_to_ui_node";
import { add_editor_info_to_ui_node } from "../utils/add_editor_info_to_ui_node";

import classes from "./styles.module.css";

const ShinyCheckboxInput: UiComponent_from_info<typeof input_checkbox> = ({
  namedArgs,
  wrapperProps,
}) => {
  const width = namedArgs.width ?? "auto";

  const settings = { ...namedArgs };

  const [value, setValue] = React.useState(settings.value);

  React.useEffect(() => {
    setValue(settings.value);
  }, [settings.value]);

  return (
    <div
      className={classes.container + " shiny::checkbox"}
      style={{ width }}
      {...wrapperProps}
    >
      <label htmlFor={settings.inputId}>
        <input
          id={settings.inputId}
          type="checkbox"
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
        />
        <span className={classes.label}>{settings.label}</span>
      </label>
    </div>
  );
};

export const shinyCheckboxInputInfo = add_editor_info_to_ui_node(
  input_checkbox,
  {
    iconSrc: icon,
    UiComponent: ShinyCheckboxInput,
  }
);
