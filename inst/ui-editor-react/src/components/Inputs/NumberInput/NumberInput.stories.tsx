import React from "react";

import { NumberInput } from "./NumberInput";

export default {
  title: "inputs/Number Input",
  component: NumberInput,
};

function InputDemo({ start = 10, width }: { start?: number; width: number }) {
  const [value, setValue] = React.useState<number>(start);

  return (
    <div
      style={{
        backgroundColor: "var(--background-grey)",
        width: `${width}px`,
        padding: "10px",
        position: "relative",
      }}
    >
      <button onClick={() => setValue(10)}>set to 10</button>
      <NumberInput
        id="MyNumber"
        label="Number Input"
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

export const Single = () => <InputDemo width={100} />;

export const Multiple = () => (
  <div
    style={{
      outline: "2px solid steelblue",
      display: "flex",
      flexDirection: "column",
      //   alignItems: "center",
      gap: "10px",
      padding: "10px",
    }}
  >
    <InputDemo width={100} />
    <InputDemo width={250} />
    <InputDemo width={450} />
  </div>
);
