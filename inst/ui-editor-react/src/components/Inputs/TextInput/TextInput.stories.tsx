import React from "react";

import { TextInput } from "./TextInput";

export default {
  title: "inputs/Text Input",
  component: TextInput,
};

function InputDemo(settings: { width: string }) {
  const { width } = settings;
  const [value, setValue] = React.useState<string>("hello");

  return (
    <div style={{ width, outline: "1px solid silver" }}>
      <div>
        Width: {width} - Current Value: "{value}"
      </div>
      <TextInput
        name="width"
        allValues={settings}
        onChange={({ name, value }) => {
          console.log(`Changed ${name} to ${value}`);
          if (!value) return;
          setValue(value);
        }}
      />
    </div>
  );
}

export const Primary = () => (
  <div
    style={{
      outline: "2px solid steelblue",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      padding: "10px",
    }}
  >
    <InputDemo width="200px" />
    <InputDemo width="400px" />
    <InputDemo width="100%" />
  </div>
);
