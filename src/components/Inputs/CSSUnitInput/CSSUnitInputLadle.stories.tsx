import React from "react";

import type { CSSMeasure } from "CSSMeasure";

import { LabeledCSSUnitInput } from ".";

export const AllCSS = () => {
  const [value, setValue] = React.useState<CSSMeasure>("100px");

  return (
    <div>
      <div> Current CSS Value: {value}</div>
      <LabeledCSSUnitInput
        name="myCSSUnit"
        value={value}
        units={["%", "auto", "fr", "rem", "px"]}
        onChange={({ name, value }) => {
          console.log(`Changed ${name} to ${value}`);
          setValue(value);
        }}
      />
    </div>
  );
};
