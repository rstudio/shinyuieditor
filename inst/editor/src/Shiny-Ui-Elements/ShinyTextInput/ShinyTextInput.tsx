import * as React from "react";

import { mergeClasses } from "../../utils/mergeClasses";
import type { UiNodeComponent } from "../uiNodeTypes";

import type { ShinyTextInputProps } from ".";

import classes from "./styles.module.css";

const ShinyTextInput: UiNodeComponent<
  ShinyTextInputProps,
  { TakesChildren: false }
> = ({ namedArgs: { width = "200px", ...inputArgs }, wrapperProps }) => {
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
export default ShinyTextInput;
