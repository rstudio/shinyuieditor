import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RadioInputs } from "./RadioInputs";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/RadioInputs",
  component: RadioInputs,
} as ComponentMeta<typeof RadioInputs>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RadioInputs> = (args) => {
  const { options, currentSelection, onChange, ...otherArgs } = args;
  const [selected, setSelected] =
    React.useState<typeof options[number]>(currentSelection);
  return (
    <RadioInputs
      options={options}
      currentSelection={selected}
      onChange={setSelected}
      {...otherArgs}
    />
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  name: "Select a letter",
  options: ["a", "b", "c", "d"],
  currentSelection: "c",
};
