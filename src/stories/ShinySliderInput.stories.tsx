import { ComponentMeta, ComponentStory } from "@storybook/react";
import ShinySliderInput from "components/shiny-ui/ShinySliderInput";
import React from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/SliderInput",
  component: ShinySliderInput,
  argTypes: {
    id: { control: "text" },
  },
} as ComponentMeta<typeof ShinySliderInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ShinySliderInput> = (args) => (
  <ShinySliderInput {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  id: "mySlider",
};
