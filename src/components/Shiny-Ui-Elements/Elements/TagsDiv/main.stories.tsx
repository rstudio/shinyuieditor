import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import TagsDiv from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/TagsDiv/main",
  component: TagsDiv,
} as ComponentMeta<typeof TagsDiv>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TagsDiv> = (args) => (
  <TagsDiv {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  horizontalAlign: "center",
  verticalAlign: "bottom",
};
