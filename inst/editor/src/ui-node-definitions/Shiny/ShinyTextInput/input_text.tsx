import React from "react";

import icon from "../../../assets/icons/shinyTextinput.png";
import { mergeClasses } from "../../../utils/mergeClasses";
import type { CSSMeasure } from "../../inputFieldTypes";
import type { UiNodeComponent } from "../../nodeInfoFactory";
import { nodeInfoFactory } from "../../nodeInfoFactory";

import classes from "./styles.module.css";

type TextInputArgs = {
  inputId: string;
  label: string;
  value: string;
  placeholder?: string;
  width?: CSSMeasure;
};

const ShinyTextInput: UiNodeComponent<
  TextInputArgs,
  { TakesChildren: false }
> = ({ namedArgs, wrapperProps }) => {
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

export const input_text = nodeInfoFactory<TextInputArgs>()({
  id: "textInput",
  r_info: {
    fn_name: "textInput",
    package: "shiny",
    input_bindings: true,
  },
  py_info: {
    fn_name: "ui.input_text",
    package: "shiny",
    input_bindings: true,
  },
  title: "Text Input",
  takesChildren: false,
  settingsInfo: {
    inputId: {
      inputType: "id",
      inputOrOutput: "input",
      label: "inputId",
      defaultValue: "myTextInput",
    },
    label: {
      inputType: "string",
      label: "label",
      defaultValue: "Text Input",
    },
    value: {
      inputType: "string",
      label: "Starting text",
      defaultValue: "",
    },
    placeholder: {
      inputType: "string",
      label: "Empty input placeholder",
      defaultValue: "placeholder text",
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
  iconSrc: icon,
  description: "Create an input control for entry of unstructured text values.",
  ui_component: ShinyTextInput,
});
