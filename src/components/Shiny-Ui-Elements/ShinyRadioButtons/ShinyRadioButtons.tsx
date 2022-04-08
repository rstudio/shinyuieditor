import type { UiNodeComponent } from "../uiNodeTypes";

import type { ShinyRadioButtonsProps } from ".";

import classes from "./styles.module.css";

const ShinyRadioButtons: UiNodeComponent<ShinyRadioButtonsProps> = ({
  children,
  uiArguments,
  eventHandlers,
  compRef,
}) => {
  const choices = uiArguments.choices;
  return (
    <div ref={compRef} className={classes.container} {...eventHandlers}>
      <label>{uiArguments.label}</label>
      <div>
        {Object.keys(choices).map((key, i) => (
          <div className={classes.radio} key={key}>
            <label>
              <input
                type="radio"
                name={choices[key]}
                value={choices[key]}
                defaultChecked={i === 0}
              />
              <span>{key}</span>
            </label>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default ShinyRadioButtons;
