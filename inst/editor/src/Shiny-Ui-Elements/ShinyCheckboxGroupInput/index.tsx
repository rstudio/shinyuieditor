import icon from "../../assets/icons/shinyCheckgroup.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import type { NamedList } from "../../components/Inputs/ListInput/NamedListInput";
import { input_checkbox_group } from "../../ui-node-definitions/Shiny/input_checkbox_group";
import { addEditorInfoToUiNode } from "../utils/add_editor_info_to_ui_node";

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
            {Object.keys(choices).map((key, i) => (
              <div className={classes.radio} key={key}>
                <label className={classes.checkbox}>
                  <input
                    type="checkbox"
                    name={choices[key]}
                    value={choices[key]}
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
