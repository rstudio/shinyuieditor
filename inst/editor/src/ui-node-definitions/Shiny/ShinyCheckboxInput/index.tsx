import React from "react";

import icon from "../../assets/icons/shinycheckbox.png";
import type { UiComponentFromInfo } from "../../utils/add_editor_info_to_ui_node";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";
import { input_checkbox } from "../input_checkbox";

import classes from "./styles.module.css";

const ShinyCheckboxInput: UiComponentFromInfo<typeof input_checkbox> = ({
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

export const shinyCheckboxInputInfo = addEditorInfoToUiNode(input_checkbox, {
  iconSrc: icon,
  UiComponent: ShinyCheckboxInput,
});
