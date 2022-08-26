import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { ShinyUiOutputProps } from "./index";

import classes from "./styles.module.css";

const ShinyUiOutput: UiNodeComponent<ShinyUiOutputProps> = ({
  uiArguments,
  wrapperProps,
}) => {
  const { outputId = "shiny-ui-output" } = uiArguments;

  return (
    <div
      className={classes.container}
      aria-label="shiny::uiOutput placeholder"
      {...wrapperProps}
    >
      <div style={{ gridArea: "1/1", placeSelf: "center" }}>
        This is a a dynamic UI Output {outputId}!
      </div>
    </div>
  );
};
export default ShinyUiOutput;
