import { output_text } from "ui-node-definitions/src/Shiny/output_text";

import uiIcon from "../../assets/icons/shinyTextOutput.png";
import { add_editor_info_to_ui_node } from "../utils/add_editor_info_to_ui_node";

import classes from "./styles.module.css";

export const shinyTextOutputInfo = add_editor_info_to_ui_node(output_text, {
  iconSrc: uiIcon,
  UiComponent: ({ namedArgs, wrapperProps }) => {
    return (
      <div className={classes.container} {...wrapperProps}>
        Dynamic text from <code>output${namedArgs.outputId}</code>
      </div>
    );
  },
});
