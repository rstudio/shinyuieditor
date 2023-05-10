import React from "react";

import { input_text } from "ui-node-definitions/src/Shiny/input_text";

import icon from "../../assets/icons/shinyTextinput.png";
import { mergeClasses } from "../../utils/mergeClasses";
import type { UiComponent_from_info } from "../utils/add_editor_info_to_ui_node";
import { add_editor_info_to_ui_node } from "../utils/add_editor_info_to_ui_node";

import classes from "./styles.module.css";

const ShinyTextInput: UiComponent_from_info<typeof input_text> = ({
  namedArgs,
  wrapperProps,
}) => {
  const [value, setValue] = React.useState(namedArgs.value);

  React.useEffect(() => {
    setValue(namedArgs.value);
  }, [namedArgs.value]);

  return (
    <div
      className={mergeClasses(classes.container, "textInput")}
      style={{
        height: "auto",
        width: namedArgs.width ?? "200px",
        // If we're using the default width, don't let it go over the width of its container
        maxWidth: namedArgs.width ? undefined : "100%",
      }}
      {...wrapperProps}
    >
      <label htmlFor={namedArgs.inputId}>{namedArgs.label}</label>
      <input
        id={namedArgs.inputId}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={namedArgs.placeholder}
      />
    </div>
  );
};

export const shinyTextInputInfo = add_editor_info_to_ui_node(input_text, {
  iconSrc: icon,
  UiComponent: ShinyTextInput,
});
