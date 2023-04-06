import * as React from "react";

import type { UiNodeComponent } from "../uiNodeTypes";

import type { ShinyCheckboxInputProps } from ".";

import classes from "./styles.module.css";

const ShinyCheckboxInput: UiNodeComponent<
  ShinyCheckboxInputProps,
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
export default ShinyCheckboxInput;
