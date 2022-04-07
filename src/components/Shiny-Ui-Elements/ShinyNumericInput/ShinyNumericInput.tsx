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
  const width = "200px";
  const height = "auto";
  const settings = { ...uiArguments };
  return (
    <div
      className={classes.container + " shiny::numericInput"}
      style={{ height, width }}
      aria-label={"shiny::numericInput"}
      ref={compRef}
      {...eventHandlers}
    >
      <span>Numeric Input with value {settings.value}</span>
      {children}
    </div>
  );
};
export default ShinyNumericInput;
