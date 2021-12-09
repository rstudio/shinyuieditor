import { ComponentMeta, ComponentStory } from "@storybook/react";

import React from "react";
import ShinyPlotOutput from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/ShinyPlotOutput/main",
  component: ShinyPlotOutput,
  argTypes: {
    name: { control: "text" },
  },
} as ComponentMeta<typeof ShinyPlotOutput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ShinyPlotOutput> = (args) => (
  <ShinyPlotOutput {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  name: "myPlot",
  width: "300px",
  height: "400px",
};

export const Defaults = Template.bind({});
Defaults.args = {};
