import React from "react";

import type { ComponentMeta, ComponentStory } from "@storybook/react";
import ShinySliderInput from "components/Shiny-Ui-Elements/ShinySliderInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/ShinySliderInput/main",
  component: ShinySliderInput,
  argTypes: {
    name: { control: "text" },
  },
} as ComponentMeta<typeof ShinySliderInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ShinySliderInput> = (args) => (
  <ShinySliderInput {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  uiArguments: {
    inputId: "mySlider",
  },
};

export const Defaults = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Defaults.args = {};
