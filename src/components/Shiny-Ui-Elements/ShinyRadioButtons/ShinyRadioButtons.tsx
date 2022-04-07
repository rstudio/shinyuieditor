import type { UiNodeComponent } from "../uiNodeTypes";

import type { ShinyRadioButtonsProps } from ".";

import classes from "./styles.module.css";

const ShinyRadioButtons: UiNodeComponent<ShinyRadioButtonsProps> = ({
  children,
  uiArguments,
  eventHandlers,
  compRef,
}) => {
  return (
    <div ref={compRef} className={classes.container} {...eventHandlers}>
      <label>{uiArguments.label}</label>
      <div>
        {uiArguments.choices.map((x, i) => (
          <div className={classes.radio} key={x}>
            <label>
              <input
                type="radio"
                name="dist"
                value="norm"
                defaultChecked={i === 0}
              />
              <span>{x}</span>
            </label>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default ShinyRadioButtons;
