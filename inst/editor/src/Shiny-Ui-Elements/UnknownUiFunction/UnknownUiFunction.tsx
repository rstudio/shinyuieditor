import * as React from "react";

import type { UiNodeComponent } from "../uiNodeTypes";

import type { UnknownUiFunctionProps } from "./index";

import "./styles.scss";

const num_preview_chars = 20;
const UnknownUiFunction: UiNodeComponent<UnknownUiFunctionProps> = ({
  uiArguments,
  wrapperProps,
}) => {
  const functionName =
    uiArguments.text.slice(0, num_preview_chars).replaceAll(/\s$/g, "") + "...";
  return (
    <div className="unknown-ui-function-display" {...wrapperProps}>
      <div>
        unknown ui output: <code>{functionName}</code>
      </div>
    </div>
  );
};
export default UnknownUiFunction;
