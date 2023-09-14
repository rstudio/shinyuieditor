import selectBoxIcon from "../../assets/icons/shinySelectbox.png";
import { input_select } from "../../ui-node-definitions/Shiny/input_select";
import { addEditorInfoToUiNode } from "../utils/add_editor_info_to_ui_node";

import classes from "./styles.module.css";

export const shinySelectInputInfo = addEditorInfoToUiNode(input_select, {
  iconSrc: selectBoxIcon,
  UiComponent: ({ namedArgs, wrapperProps }) => {
    const choices = namedArgs.choices;
    const id = namedArgs.inputId;
    return (
      <div className={classes.container} {...wrapperProps}>
        <label htmlFor={id}>{namedArgs.label}</label>
        <select id={id}>
          {Object.keys(choices).map((key, i) => (
            <option value={choices[key]} key={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
    );
  },
});
