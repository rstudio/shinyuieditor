import React from "react";

import type { CSSMeasure } from "components/Inputs/CSSUnitInput/CSSMeasure";

import { LabeledCSSUnitInput } from ".";

// export default {
//   title: "CSS Unit Input",
//   component: LabeledCSSUnitInput,
// };

export const Primary = () => {
  const [value, setValue] = React.useState<CSSMeasure>("100px");

  return (
    <div>
      <div> Current CSS Value: {value}</div>
      <LabeledCSSUnitInput
        name="myCSSUnit"
        value={value}
        units={["%", "auto", "fr", "rem", "px"]}
        onChange={({ name, value }) => {
          // eslint-disable-next-line no-console
          console.log(`Changed ${name} to ${value}`);
          if (!value) return;
          setValue(value);
        }}
      />
    </div>
  );
};
