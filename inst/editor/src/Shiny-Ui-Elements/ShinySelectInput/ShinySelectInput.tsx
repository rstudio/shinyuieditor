import type { UiNodeComponent } from "../uiNodeTypes";

import type { ShinySelectInputProps } from ".";

import classes from "./styles.module.css";

const ShinySelectInput: UiNodeComponent<
  ShinySelectInputProps,
  { TakesChildren: false }
> = ({ namedArgs, wrapperProps }) => {
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
};

export default ShinySelectInput;
