import * as React from "react";

import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { ShinyCheckboxInputProps } from ".";

import classes from "./styles.module.css";

const ShinyCheckboxInput: UiNodeComponent<ShinyCheckboxInputProps> = ({
  children,
  uiArguments,
  eventHandlers,
  compRef,
}) => {
  const width = uiArguments.width ?? "auto";

  const settings = { ...uiArguments };

  const [value, setValue] = React.useState(settings.value);

  React.useEffect(() => {
    setValue(settings.value);
  }, [settings.value]);

  return (
    <div
      className={classes.container + " shiny::checkbox"}
      style={{ width }}
      aria-label={"shiny::checkbox"}
      ref={compRef}
      {...eventHandlers}
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
      {children}
    </div>
  );
};
export default ShinyCheckboxInput;
