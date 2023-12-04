import React from "react";

import sliderIcon from "../../../assets/icons/shinySlider.png";
import { mergeClasses } from "../../../utils/mergeClasses";
import type { CSSMeasure } from "../../inputFieldTypes";
import { nodeInfoFactory } from "../../nodeInfoFactory";
import { InputOutputTitle } from "../../utils/InputOutputTitle";

import classes from "./styles.module.css";

export const input_slider = nodeInfoFactory<{
  inputId: string;
  label: string;
  min: number;
  value: number;
  max: number;
  step?: number;
  width?: CSSMeasure;
}>()({
  id: "sliderInput",
  r_info: {
    fn_name: "sliderInput",
    package: "shiny",
    input_bindings: true,
  },
  py_info: {
    fn_name: "ui.input_slider",
    package: "shiny",
    input_bindings: true,
  },
  title: "Slider Input",
  takesChildren: false,
  settingsInfo: {
    inputId: {
      inputType: "id",
      inputOrOutput: "input",
      label: "Input ID",
      defaultValue: "inputId",
    },
    label: {
      label: "Label text",
      inputType: "string",
      defaultValue: "Slider Input",
    },
    min: {
      label: "Min",
      inputType: "number",
      defaultValue: 0,
    },
    max: {
      label: "Max",
      inputType: "number",
      defaultValue: 10,
    },
    value: {
      label: "Start",
      inputType: "number",
      defaultValue: 5,
    },
    step: {
      inputType: "number",
      label: "Step size",
      defaultValue: 1,
      optional: true,
    },
    width: {
      inputType: "cssMeasure",
      label: "Width",
      defaultValue: "100%",
      units: ["%", "px", "rem"],
      optional: true,
      useDefaultIfOptional: true,
    },
  },
  iconSrc: sliderIcon,
  category: "Inputs",
  description:
    "Constructs a slider widget to select a number from a range. _(Dates and date-times not currently supported.)_",
  ui_component: ({ namedArgs, wrapperProps }) => {
    const settings = { ...namedArgs };
    const { width = "200px" } = settings;
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
          <InputOutputTitle type="input" name={settings.inputId} /> ={" "}
          {currentVal}
        </div>
      </div>
    );
  },
});
