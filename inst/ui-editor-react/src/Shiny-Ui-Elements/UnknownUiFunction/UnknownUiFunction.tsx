import * as React from "react";

import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { UnknownUiFunctionProps } from "./index";

import classes from "./styles.module.css";

const num_preview_chars = 20;
const UnknownUiFunction: UiNodeComponent<UnknownUiFunctionProps> = ({
  uiArguments,
  wrapperProps,
}) => {
  const functionName =
    uiArguments.text.slice(0, num_preview_chars).replaceAll(/\s$/g, "") + "...";
  return (
    <div
      className={classes.container}
      aria-label="shiny::uiOutput placeholder"
      {...wrapperProps}
    >
      <div>
        unknown ui output: <code>{functionName}</code>
      </div>
    </div>
  );
};
export default UnknownUiFunction;
