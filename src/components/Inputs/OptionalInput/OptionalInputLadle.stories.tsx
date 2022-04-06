import React from "react";

import OptionalInput from "./OptionalInput";

export const OptionalNumeric = () => {
  const [value, setValue] = React.useState<number | undefined>(4);

  return (
    <OptionalInput
      type="number"
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
export const OptionalText = () => {
  const [value, setValue] = React.useState<string | undefined>("hello");

  return (
    <OptionalInput
      type="string"
      name="my-text"
      value={value}
      defaultValue={"world"}
      onChange={({ name, value }) => {
        console.log(`Changed ${name} to ${value}`);
        setValue(value);
      }}
    />
  );
};
