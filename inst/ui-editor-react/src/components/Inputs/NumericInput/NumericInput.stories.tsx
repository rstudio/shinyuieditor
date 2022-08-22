import React from "react";

import NumericInput from "./NumericInput";

export default {
  title: "Numeric Input",
  component: NumericInput,
};

export const Primary = () => {
  const [value, setValue] = React.useState<number>(100);

  return (
    <div>
      <div> Current CSS Value: {value}</div>
      <NumericInput
        name="test"
        value={value}
        onChange={({ name, value }) => {
          console.log(`Changed ${name} to ${value}`);
          if (!value) return;
          setValue(value);
        }}
      />
    </div>
  );
};
