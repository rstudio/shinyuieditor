import * as React from "react";

import type { UiNodeComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";

import { InputOutputTitle } from "../InputOutputTitle";

import type { ShinySliderInputProps } from ".";

import classes from "./styles.module.css";

const ShinySliderInput: UiNodeComponent<ShinySliderInputProps> = ({
  children,
  uiArguments,
  eventHandlers,
  compRef,
}) => {
  const width = "200px";
  const height = "auto";
  const settings = { ...uiArguments };
  const [currentVal, setCurrentVal] = React.useState(settings.value);
  return (
    <div
      className={classes.container + " shiny::sliderInput"}
      style={{ height, width }}
      aria-label={"shiny::sliderInput"}
      ref={compRef}
      {...eventHandlers}
    >
      <div style={{ gridArea: "1/1", placeSelf: "center", maxWidth: "300px" }}>
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
          />
        </div>
        <div>
          <InputOutputTitle type="input" name={settings.inputId} /> ={" "}
          {currentVal}
        </div>
      </div>
      {children}
    </div>
  );
};
export default ShinySliderInput;
