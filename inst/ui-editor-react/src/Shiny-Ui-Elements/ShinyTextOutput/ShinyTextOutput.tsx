import * as React from "react";

import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { ShinyTextOutputProps } from "./index";

import classes from "./styles.module.css";

const ShinyTextOutput: UiNodeComponent<ShinyTextOutputProps> = ({
  uiArguments,
  compRef,
  wrapperProps,
}) => {
  return (
    <div
      className={classes.container}
      ref={compRef}
      aria-label="shiny::textOutput placeholder"
      {...wrapperProps}
    >
      Dynamic text from <code>output${uiArguments.outputId}</code>
    </div>
  );
};
export default ShinyTextOutput;
