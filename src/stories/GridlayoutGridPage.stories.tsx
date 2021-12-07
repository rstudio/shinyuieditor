import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { LabeledGridHolder } from "../components/LabeledGridHolder";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/GridPage",
  component: LabeledGridHolder,
  // argTypes: {
  //   area: {
  //     control: { type: "select", options: uniqueAreas },
  //   },
  // },
} as ComponentMeta<typeof LabeledGridHolder>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LabeledGridHolder> = (args) => (
  <LabeledGridHolder {...args}></LabeledGridHolder>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  areas: [
    ["a", "a", "b", "other"],
    ["c", "d", "d", "other"],
  ],
  rowSizes: ["100px", "200px"],
  colSizes: "200px",
  gapSize: "1rem",
};
