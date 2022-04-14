import * as React from "react";

import type { UiNodeComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";

import type { ShinyUiOutputProps } from "./index";

import classes from "./styles.module.css";

const ShinyUiOutput: UiNodeComponent<ShinyUiOutputProps> = ({
  uiArguments,
  children,
  eventHandlers,
  compRef,
}) => {
  const { outputId = "shiny-ui-output" } = uiArguments;

  return (
    <div
      className={classes.container}
      ref={compRef}
      aria-label="shiny::uiOutput placeholder"
      {...eventHandlers}
    >
      <div style={{ gridArea: "1/1", placeSelf: "center" }}>
        This is a a dynamic UI Output {outputId}!
      </div>
      {children}
    </div>
  );
};
export default ShinyUiOutput;
