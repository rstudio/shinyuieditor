import { ComponentMeta, ComponentStory } from "@storybook/react";
import ShinyPlotOutput from "components/shiny-ui/ShinyPlotOutput";
import React from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/PlotOutput",
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
};

export const Secondary = Template.bind({});
Secondary.args = {
  name: "myOtherPlot",
};
