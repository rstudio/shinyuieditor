import uiIcon from "../../assets/icons/shinyImage.png";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";
import { output_ui } from "../output_ui";

import classes from "./styles.module.css";

export const shinyUiOutputInfo = addEditorInfoToUiNode(output_ui, {
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
