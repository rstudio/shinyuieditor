import React from "react";

import icon from "../../assets/icons/shinycheckbox.png";
import type { CSSMeasure } from "../../inputFieldTypes";
import type { UiNodeComponent } from "../../nodeInfoFactory";
import { nodeInfoFactory } from "../../nodeInfoFactory";

import classes from "./styles.module.css";

type TextInputArgs = {
  inputId: string;
  label: string;
  value: boolean;
  width?: CSSMeasure;
};

const ShinyCheckboxInput: UiNodeComponent<
  TextInputArgs,
  { TakesChildren: false }
> = ({ namedArgs, wrapperProps }) => {
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

export const input_checkbox = nodeInfoFactory<{
  inputId: string;
  label: string;
  value: boolean;
  width?: CSSMeasure;
}>()({
  id: "checkboxInput",
  r_info: {
    fn_name: "checkboxInput",
    package: "shiny",
    input_bindings: true,
  },
  py_info: {
    fn_name: "ui.input_checkbox",
    package: "shiny",
    input_bindings: true,
  },
  title: "Checkbox Input",
  takesChildren: false,
  settingsInfo: {
    inputId: {
      inputType: "id",
      inputOrOutput: "input",
      label: "inputId",
      defaultValue: "myCheckboxInput",
    },
    label: {
      inputType: "string",
      label: "label",
      defaultValue: "Checkbox Input",
    },
    value: {
      inputType: "boolean",
      label: "Starting value",
      defaultValue: false,
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
  description: "Create a checkbox that can be used to specify logical values.",
  ui_component: ShinyCheckboxInput,
  iconSrc: icon,
});
