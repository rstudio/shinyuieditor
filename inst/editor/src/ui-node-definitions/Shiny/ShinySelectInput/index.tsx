import { namedListToItemTypeArray } from "../../../components/Inputs/ListInput/namedListUtils";
import selectBoxIcon from "../../assets/icons/shinySelectbox.png";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";
import { input_select } from "../input_select";

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
          {namedListToItemTypeArray(choices).map(({ key, value, id }, i) => (
            <option value={value} key={id}>
              {key}
            </option>
          ))}
        </select>
      </div>
    );
  },
});
