import * as React from "react";
import { UiNodeComponent } from "../uiComponentAndSettings";
import { UiComponentInfo } from "../UiComponentInfo";
import { buildSliderSettings, ShinySliderInputProps } from "./arguments";
import { ShinySliderInputSettings } from "./SettingsPanel";
import classes from "./styles.module.css";
import sliderIcon from "assets/icons/shinySlider.png";

const ShinySliderInput: UiNodeComponent<ShinySliderInputProps> = ({
  children,
  uiArguments,
  ...passthroughProps
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
      {...passthroughProps}
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

export const shinySliderInputInfo: UiComponentInfo<ShinySliderInputProps> = {
  title: "Slider Input",
  UiComponent: ShinySliderInput,
  SettingsComponent: ShinySliderInputSettings,
  acceptsChildren: false,
  defaultSettings: {
    inputId: "slider",
    label: "Slider",
    min: 0,
    value: 5,
    max: 10,
  },
  iconSrc: sliderIcon,
};

export default ShinySliderInput;
