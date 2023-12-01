import type { CSSMeasure } from "../../../components/Inputs/CSSUnitInput/CSSMeasure";
import { namedListToItemTypeArray } from "../../../components/Inputs/ListInput/namedListUtils";
import icon from "../../assets/icons/shinyCheckgroup.png";
import type { NamedList } from "../../inputFieldTypes";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";
import { input_checkbox_group } from "../input_checkbox_group";

import classes from "./styles.module.css";

export type ShinyCheckboxGroupInputProps = {
  inputId: string;
  label: string;
  choices: NamedList;
  width?: CSSMeasure;
};

export const shinyCheckboxGroupInputInfo = addEditorInfoToUiNode(
  input_checkbox_group,
  {
    iconSrc: icon,
    UiComponent: ({ namedArgs, wrapperProps }) => {
      const choices = namedArgs.choices;
      return (
        <div
          className={classes.container}
          style={{ width: namedArgs.width }}
          {...wrapperProps}
        >
          <label>{namedArgs.label}</label>
          <div>
            {namedListToItemTypeArray(choices).map(({ key, value, id }, i) => (
              <div key={id}>
                <label className={classes.checkbox}>
                  <input
                    type="checkbox"
                    name={value}
                    value={value}
                    defaultChecked={i === 0}
                  />
                  <span>{key}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    },
  }
);
