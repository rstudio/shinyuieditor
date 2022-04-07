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
    <div className={classes.container}>
      <label>{uiArguments.label}</label>
      <div>
        {uiArguments.choices.map((x) => (
          <div key={x}>{x}</div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default ShinyRadioButtons;
