import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import GridEditor from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/GridEditor",
  component: GridEditor,
  // argTypes: {
  //   area: {
  //     control: { type: "select", options: uniqueAreas },
  //   },
  // },
} as ComponentMeta<typeof GridEditor>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GridEditor> = (args) => (
  <GridEditor {...args}></GridEditor>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  areas: [
    ["a", ".", "b", "other"],
    ["c", "d", "d", "other"],
  ],
  rowSizes: ["100px", "200px"],
  colSizes: "1fr",
  gapSize: "1rem",
  items: {},
};
