import { input_action_button } from "ui-node-definitions/src/Shiny/input_action_button";

import buttonIcon from "../../assets/icons/shinyButton.png";
import Button from "../../components/Inputs/Button/Button";
import { add_editor_info_to_ui_node } from "../utils/add_editor_info_to_ui_node";

import classes from "./styles.module.css";

export const shinyActionButtonInfo = add_editor_info_to_ui_node(
  input_action_button,
  {
    UiComponent: ({ namedArgs, wrapperProps }) => {
      const { label = "My Action Button", width } = namedArgs;

      return (
        <div className={classes.container} {...wrapperProps}>
          <Button style={width ? { width } : undefined}>{label}</Button>
        </div>
      );
    },
    iconSrc: buttonIcon,
  }
);
