import React from "react";

import type { ComponentMeta, ComponentStory } from "@storybook/react";

import NumericInput from "./NumericInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/NumericInput",
  component: NumericInput,
} as ComponentMeta<typeof NumericInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NumericInput> = (args) => {
  const [val, setVal] = React.useState(args.value ?? 0);
  return <NumericInput {...args} value={val} onChange={setVal} />;
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  value: 3,
};
