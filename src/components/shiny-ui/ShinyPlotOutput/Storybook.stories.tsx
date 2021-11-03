import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ShinyPlotOutputProps } from "components/shiny-ui/ShinyPlotOutput";
import ShinyPlotOutputSettings from "components/shiny-ui/ShinyPlotOutput/SettingsPanel";
import React from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI-Settings/PlotOutput",
  component: ShinyPlotOutputSettings,
} as ComponentMeta<typeof ShinyPlotOutputSettings>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ShinyPlotOutputSettings> = (args) => (
  <div style={{ width: "400px", height: "400px", outline: "1px solid black" }}>
    <ShinyPlotOutputSettings {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  startingSettings: {
    name: "mySlider",
    width: "400px",
    height: "300px",
  },
  onUpdate: (newSettings: ShinyPlotOutputProps) => console.log(newSettings),
};
