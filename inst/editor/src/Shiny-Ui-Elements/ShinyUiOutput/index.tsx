import { output_ui } from "ui-node-definitions/src/Shiny/output_ui";

import uiIcon from "../../assets/icons/shinyImage.png";
import { add_editor_info_to_ui_node } from "../utils/add_editor_info_to_ui_node";

import classes from "./styles.module.css";

export const shinyUiOutputInfo = add_editor_info_to_ui_node(output_ui, {
  iconSrc: uiIcon,
  UiComponent: ({ namedArgs, wrapperProps }) => {
    const { outputId = "shiny-ui-output" } = namedArgs;

    return (
      <div className={classes.container} {...wrapperProps}>
        <div style={{ gridArea: "1/1", placeSelf: "center" }}>
          This is a a dynamic UI Output {outputId}!
        </div>
      </div>
    );
  },
});
