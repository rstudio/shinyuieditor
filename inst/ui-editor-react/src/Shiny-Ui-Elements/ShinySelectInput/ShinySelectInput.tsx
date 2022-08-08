import type { UiNodeComponent } from "../uiNodeTypes";

import type { ShinySelectInputProps } from ".";

import classes from "./styles.module.css";

const ShinySelectInput: UiNodeComponent<ShinySelectInputProps> = ({
  children,
  uiArguments,
  eventHandlers,
  compRef,
}) => {
  const choices = uiArguments.choices;
  const id = uiArguments.inputId;
  return (
    <div ref={compRef} className={classes.container} {...eventHandlers}>
      <label htmlFor={id}>{uiArguments.label}</label>
      <select id={id}>
        {Object.keys(choices).map((key, i) => (
          <option value={choices[key]} key={key}>
            {key}
          </option>
        ))}
      </select>
      {children}
    </div>
  );
};

export default ShinySelectInput;
