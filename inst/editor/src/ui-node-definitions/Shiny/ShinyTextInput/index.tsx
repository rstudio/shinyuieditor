import React from "react";

import { mergeClasses } from "../../../utils/mergeClasses";
import icon from "../../assets/icons/shinyTextinput.png";
import type { UiComponentFromInfo } from "../../utils/add_editor_info_to_ui_node";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";
import { input_text } from "../input_text";

import classes from "./styles.module.css";

const ShinyTextInput: UiComponentFromInfo<typeof input_text> = ({
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

export const shinyTextInputInfo = addEditorInfoToUiNode(input_text, {
  iconSrc: icon,
  UiComponent: ShinyTextInput,
});
