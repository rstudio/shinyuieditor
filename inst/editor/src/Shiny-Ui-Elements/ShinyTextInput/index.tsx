import React from "react";

import { input_text } from "ui-node-definitions/src/Shiny/input_text";

import icon from "../../assets/icons/shinyTextinput.png";
import { mergeClasses } from "../../utils/mergeClasses";
import type { UiComponent_from_info } from "../add_editor_info_to_ui_node";
import { add_editor_info_to_ui_node } from "../add_editor_info_to_ui_node";

import classes from "./styles.module.css";

const ShinyTextInput: UiComponent_from_info<typeof input_text> = ({
  namedArgs: { width = "200px", ...inputArgs },
  wrapperProps,
}) => {
  const height = "auto";
  const settings = { ...inputArgs };

  const [value, setValue] = React.useState(settings.value);

  React.useEffect(() => {
    setValue(settings.value);
  }, [settings.value]);

  return (
    <div
      className={mergeClasses(classes.container, "textInput")}
      style={{ height, width }}
      {...wrapperProps}
    >
      <label htmlFor={settings.inputId}>{settings.label}</label>
      <input
        id={settings.inputId}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={settings.placeholder}
      />
    </div>
  );
};

export const shinyTextInputInfo = add_editor_info_to_ui_node(input_text, {
  iconSrc: icon,
  UiComponent: ShinyTextInput,
});
