import React from "react";

import { input_slider } from "ui-node-definitions/src/Shiny/input_slider";

import sliderIcon from "../../assets/icons/shinySlider.png";
import { LabeledInputCategory } from "../../components/Inputs/SettingsFormBuilder/LabeledInputCategory";
import { mergeClasses } from "../../utils/mergeClasses";
import type { UiComponent_from_info } from "../add_editor_info_to_ui_node";
import { add_editor_info_to_ui_node } from "../add_editor_info_to_ui_node";
import { InputOutputTitle } from "../InputOutputTitle";

import classes from "./styles.module.css";

const ShinySliderInput: UiComponent_from_info<typeof input_slider> = ({
  namedArgs,
  wrapperProps,
}) => {
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

export const shinySliderInputInfo = add_editor_info_to_ui_node(input_slider, {
  settingsFormRender: ({ inputs }) => {
    return (
      <>
        {inputs.inputId}
        {inputs.label}
        <LabeledInputCategory label="Values">
          {inputs.min}
          {inputs.max}
          {inputs.value}
          {inputs.step}
        </LabeledInputCategory>
        {inputs.width}
      </>
    );
  },
  UiComponent: ShinySliderInput,
  iconSrc: sliderIcon,
});

export default ShinySliderInput;
