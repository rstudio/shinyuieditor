import React from "react";

import icon from "../../assets/icons/shinyRadioButtons.png";
import type { UiComponentFromInfo } from "../../utils/add_editor_info_to_ui_node";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";
import { input_radio_buttons } from "../input_radio_buttons";

const ShinyRadioButtons: UiComponentFromInfo<typeof input_radio_buttons> = ({
  namedArgs,
  wrapperProps,
}) => {
  const choices = namedArgs.choices;
  const keys = Object.keys(choices);
  const values = Object.values(choices);

  const [selection, setSelection] = React.useState<string>(values[0]);

  React.useEffect(() => {
    // If the user changes the value of the currently selected element, just
    // reset selection to the first element
    if (!values.includes(selection)) {
      setSelection(values[0]);
    }
  }, [selection, values]);

  return (
    <div className="p-1" style={{ width: namedArgs.width }} {...wrapperProps}>
      <label>{namedArgs.label}</label>
      <div className="flex flex-col pt-1">
        {values.map((value, i) => (
          <label className="flex items-center gap-1" key={value}>
            <input
              type="radio"
              name={namedArgs.inputId}
              value={value}
              onChange={(x) => setSelection(x.target.value)}
              checked={value === selection}
            />
            <span>{keys[i]}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export const shinyRadioButtonsInfo = addEditorInfoToUiNode(
  input_radio_buttons,
  {
    UiComponent: ShinyRadioButtons,
    iconSrc: icon,
  }
);
