import * as React from "react";

import type { UiNodeComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";

import type { ShinyCheckboxInputProps } from ".";

import classes from "./styles.module.css";

const ShinyCheckboxInput: UiNodeComponent<ShinyCheckboxInputProps> = ({
  children,
  uiArguments,
  eventHandlers,
  compRef,
}) => {
  const width = "200px";
  const height = "auto";
  const settings = { ...uiArguments };

  const [value, setValue] = React.useState(settings.value);

  React.useEffect(() => {
    setValue(settings.value);
  }, [settings.value]);

  return (
    <div
      className={classes.container + " shiny::textInput"}
      style={{ height, width }}
      aria-label={"shiny::textInput"}
      ref={compRef}
      {...eventHandlers}
    >
      <label htmlFor={settings.inputId}>{settings.label}</label>
      <input
        id={settings.inputId}
        type="checkbox"
        checked={value}
        onChange={(e) => setValue(e.target.checked)}
      />
      {children}
    </div>
  );
};
export default ShinyCheckboxInput;
