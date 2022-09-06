import React from "react";

import { OptionsDropdownSimple } from "./OptionsDropdown";

export default {
  title: "inputs/Options Dropdown",
  component: OptionsDropdownSimple,
};

function InputDemo<Option extends string>({ options }: { options: Option[] }) {
  const [chosen, setChosen] = React.useState<string>(options[1]);

  console.log("Chosen value", chosen);

  return (
    <OptionsDropdownSimple
      options={options}
      selected={chosen}
      onChange={setChosen}
    />
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
    <InputDemo options={["a", "b", "c"]} />
    <InputDemo options={["first", "second", "third"]} />
  </div>
);
