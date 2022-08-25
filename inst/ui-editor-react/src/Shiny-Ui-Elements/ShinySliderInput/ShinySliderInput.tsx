import * as React from "react";

import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import { InputOutputTitle } from "../InputOutputTitle";

import type { ShinySliderInputProps } from ".";

import classes from "./styles.module.css";

const ShinySliderInput: UiNodeComponent<ShinySliderInputProps> = ({
  uiArguments,
  compRef,
}) => {
  const settings = { ...uiArguments };
  const { width = "200px" } = settings;
  const [currentVal, setCurrentVal] = React.useState(settings.value);
  return (
    <div
      className={classes.container + " shiny::sliderInput"}
      style={{ width }}
      aria-label={"shiny::sliderInput"}
      ref={compRef}
    >
      <div>{settings.label}</div>
      <div className={classes.sliderWrapper}>
        <input
          type="range"
          min={settings.min}
          max={settings.max}
          value={currentVal}
          onChange={(e) => setCurrentVal(Number(e.target.value))}
          className={"slider " + classes.sliderInput}
          aria-label={"slider input"}
          data-min={settings.min}
          data-max={settings.max}
          // In order to allow the user to actually drag the slider we need to
          // kill the event before it can propigate to the parent. Inorder to
          // intercept it we need to flag the item as draggable
          draggable={true}
          onDragStartCapture={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        />
      </div>
      <div>
        <InputOutputTitle type="input" name={settings.inputId} /> = {currentVal}
      </div>
    </div>
  );
};
export default ShinySliderInput;
