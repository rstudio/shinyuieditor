import * as React from "react";

import type { UiNodeComponent } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";

import type { ShinySliderInputProps } from "./arguments";
import { buildSliderSettings } from "./arguments";
import classes from "./styles.module.css";

const ShinySliderInput: UiNodeComponent<ShinySliderInputProps> = ({
  children,
  uiArguments,
  eventHandlers,
  compRef,
}) => {
  const width = "200px";
  const height = "auto";
  const settings = buildSliderSettings({ ...uiArguments });
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
        <input
          type="range"
          min={settings.min}
          max={settings.max}
          value={currentVal}
          onChange={(e) => setCurrentVal(Number(e.target.value))}
          className="slider"
          aria-label={"slider input"}
        />
        <div>
          Min: {settings.min}, Max: {settings.max}
        </div>
        <div>
          input${settings.inputId} = {currentVal}
        </div>
      </div>
      {children}
    </div>
  );
};
export default ShinySliderInput;
