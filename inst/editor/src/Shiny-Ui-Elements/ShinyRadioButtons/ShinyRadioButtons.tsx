import React from "react";

import type { UiNodeComponent } from "../uiNodeTypes";

import type { ShinyRadioButtonsProps } from ".";

import classes from "./styles.module.css";

const ShinyRadioButtons: UiNodeComponent<
  ShinyRadioButtonsProps,
  { TakesChildren: false }
> = ({ namedArgs, wrapperProps }) => {
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
    <div
      className={classes.container}
      style={{ width: namedArgs.width }}
      {...wrapperProps}
    >
      <label>{namedArgs.label}</label>
      <div>
        {values.map((value, i) => (
          <div className={classes.radio} key={value}>
            <label>
              <input
                type="radio"
                name={namedArgs.inputId}
                value={value}
                onChange={(x) => setSelection(x.target.value)}
                checked={value === selection}
              />
              <span>{keys[i]}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShinyRadioButtons;
