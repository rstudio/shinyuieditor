import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AreaLabeledGridHolder } from "../components/GridHolder";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/GridPage",
  component: AreaLabeledGridHolder,
  // argTypes: {
  //   area: {
  //     control: { type: "select", options: uniqueAreas },
  //   },
  // },
} as ComponentMeta<typeof AreaLabeledGridHolder>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AreaLabeledGridHolder> = (args) => (
  <AreaLabeledGridHolder {...args}></AreaLabeledGridHolder>
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
