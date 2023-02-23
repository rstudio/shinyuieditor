import type { UiLeafNodeComponent } from "../uiNodeTypes";

import type { ShinyUiOutputProps } from "./index";

import classes from "./styles.module.css";

const ShinyUiOutput: UiLeafNodeComponent<ShinyUiOutputProps> = ({
  uiArguments,
  wrapperProps,
}) => {
  const { outputId = "shiny-ui-output" } = uiArguments;

  return (
    <div className={classes.container} {...wrapperProps}>
      <div style={{ gridArea: "1/1", placeSelf: "center" }}>
        This is a a dynamic UI Output {outputId}!
      </div>
    </div>
  );
};
export default ShinyUiOutput;
