import * as React from "react";

import { mergeClasses } from "../../utils/mergeClasses";
import { InputOutputTitle } from "../InputOutputTitle";
import type { UiNodeComponent } from "../uiNodeTypes";

import type { ShinySliderInputProps } from ".";

import classes from "./styles.module.css";

const ShinySliderInput: UiNodeComponent<
  ShinySliderInputProps,
  { TakesChildren: false }
> = ({ namedArgs, wrapperProps }) => {
  const settings = { ...namedArgs };
  const { width = "200px" } = settings;
  const [currentVal, setCurrentVal] = React.useState(settings.value);
  return (
    <div
      className={mergeClasses(classes.container, "sliderInput")}
      style={{ width }}
      {...wrapperProps}
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
