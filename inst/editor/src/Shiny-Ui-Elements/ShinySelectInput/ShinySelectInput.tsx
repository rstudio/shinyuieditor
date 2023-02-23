import type { UiLeafNodeComponent } from "../uiNodeTypes";

import type { ShinySelectInputProps } from ".";

import classes from "./styles.module.css";

const ShinySelectInput: UiLeafNodeComponent<ShinySelectInputProps> = ({
  uiArguments,
  wrapperProps,
}) => {
  const choices = uiArguments.choices;
  const id = uiArguments.inputId;
  return (
    <div className={classes.container} {...wrapperProps}>
      <label htmlFor={id}>{uiArguments.label}</label>
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
