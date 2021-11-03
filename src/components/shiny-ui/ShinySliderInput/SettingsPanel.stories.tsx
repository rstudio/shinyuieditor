import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ShinySliderInputProps } from "components/shiny-ui/ShinySliderInput";
import ShinySliderInputSettings from "components/shiny-ui/ShinySliderInput/SettingsPanel";
import React from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/ShinySliderInput/SettingsPanel",
  component: ShinySliderInputSettings,
} as ComponentMeta<typeof ShinySliderInputSettings>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ShinySliderInputSettings> = (args) => (
  <div style={{ width: "400px", height: "400px", outline: "1px solid black" }}>
    <ShinySliderInputSettings {...args} />
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
  onUpdate: (newSettings: ShinySliderInputProps) => console.log(newSettings),
};
