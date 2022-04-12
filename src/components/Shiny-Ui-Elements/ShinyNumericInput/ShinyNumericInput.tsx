import * as React from "react";

import type { UiNodeComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";

import type { ShinyNumericInputProps } from ".";

import classes from "./styles.module.css";

const ShinyNumericInput: UiNodeComponent<ShinyNumericInputProps> = ({
  children,
  uiArguments,
  eventHandlers,
  compRef,
}) => {
  const settings = { ...uiArguments };

  const width = settings.width ?? "200px";

  const [value, setValue] = React.useState(settings.value);

  React.useEffect(() => {
    setValue(settings.value);
  }, [settings.value]);

  return (
    <div
      className={classes.container + " shiny::numericInput"}
      style={{ width }}
      aria-label={"shiny::numericInput"}
      ref={compRef}
      {...eventHandlers}
    >
      <span>{settings.label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        min={settings.min}
        max={settings.max}
        step={settings.step}
      />
      {children}
    </div>
  );
};
export default ShinyNumericInput;
