import * as React from "react";

import type { UiNodeComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";

import type { UnknownUiFunctionProps } from "./index";

import classes from "./styles.module.css";

const UnknownUiFunction: UiNodeComponent<UnknownUiFunctionProps> = ({
  uiArguments,
  children,
  eventHandlers,
  compRef,
}) => {
  const { text } = uiArguments;

  return (
    <div
      className={classes.container}
      ref={compRef}
      aria-label="shiny::uiOutput placeholder"
      {...eventHandlers}
    >
      <div className={classes.codeHolder}>{text}</div>
      {children}
    </div>
  );
};
export default UnknownUiFunction;
