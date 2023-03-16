import type { UiNodeComponent } from "../uiNodeTypes";

import type { ShinyCheckboxGroupInputProps } from ".";

import classes from "./styles.module.css";

const ShinyCheckboxGroupInput: UiNodeComponent<
  ShinyCheckboxGroupInputProps,
  { TakesChildren: false }
> = ({ uiArguments, wrapperProps }) => {
  const choices = uiArguments.choices;
  return (
    <div
      className={classes.container}
      style={{ width: uiArguments.width }}
      {...wrapperProps}
    >
      <label>{uiArguments.label}</label>
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
};

export default ShinyCheckboxGroupInput;
