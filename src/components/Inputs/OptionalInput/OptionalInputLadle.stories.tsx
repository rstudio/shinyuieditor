import React from "react";

import OptionalInput from "./OptionalInput";

export const OptionalNumeric = () => {
  const [value, setValue] = React.useState<number | undefined>(4);

  return (
    <OptionalInput
      name="numeric-value"
      value={value}
      defaultValue={1}
      onChange={({ name, value }) => {
        console.log(`Changed ${name} to ${value}`);
        setValue(value);
      }}
    />
  );
};
