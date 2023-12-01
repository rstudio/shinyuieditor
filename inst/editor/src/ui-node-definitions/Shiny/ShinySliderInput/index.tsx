import React from "react";

import { LabeledInputCategory } from "../../../SettingsPanel/LabeledInputCategory";
import { mergeClasses } from "../../../utils/mergeClasses";
import sliderIcon from "../../assets/icons/shinySlider.png";
import type { UiComponentFromInfo } from "../../utils/add_editor_info_to_ui_node";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";
import { InputOutputTitle } from "../../utils/InputOutputTitle";
import { input_slider } from "../input_slider";

import classes from "./styles.module.css";

const ShinySliderInput: UiComponentFromInfo<typeof input_slider> = ({
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

export const shinySliderInputInfo = addEditorInfoToUiNode(input_slider, {
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
