import React from "react";

import { alignTextCenter, alignTextLeft, alignTextRight } from "../../Icons";

import type { RadioOption } from "./RadioInputsSimple";
import { RadioInputs } from "./RadioInputsSimple";

export default {
  title: "Radio Input",
  component: RadioInputs,
};

const horizontalAlignOptions = {
  start: { icon: alignTextLeft, label: "left" },
  center: { icon: alignTextCenter, label: "center" },
  end: { icon: alignTextRight, label: "right" },
};

export const RadioInput = () => {
  const [value, setValue] = React.useState<RadioOption>("center");

  return (
    <>
      <span>Current value: {value}</span>
      <RadioInputs
        id="myRadio"
        label="Radio Input"
        choices={horizontalAlignOptions}
        value={value}
        onChange={setValue}
      />
    </>
  );
};

const textOptions = {
  default: { label: "Normal" },
  italic: { label: "Italic" },
  bold: { label: "Boldy" },
};

export const TextOptions = () => {
  const [value, setValue] = React.useState<RadioOption>("default");

  return (
    <>
      <span>Current value: {value}</span>
      <RadioInputs
        id="myRadio"
        label="Radio Input"
        choices={textOptions}
        value={value}
        onChange={setValue}
      />
    </>
  );
};
