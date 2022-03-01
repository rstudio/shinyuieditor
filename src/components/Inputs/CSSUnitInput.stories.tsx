import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CSSUnitInput } from "./CSSUnitInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/CSSUnitInput",
  component: CSSUnitInput,
} as ComponentMeta<typeof CSSUnitInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CSSUnitInput> = (args) => (
  <CSSUnitInput {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  value: "1rem",
};
