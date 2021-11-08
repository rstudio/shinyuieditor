import { ComponentMeta, ComponentStory } from "@storybook/react";
import UiChooser from "components/shiny-ui/UiChooser";
import React from "react";
import { uniqueMatrixElements } from "utils/array-helpers";
import { AreaLabeledGridHolder } from "../../GridHolder";

const layoutAreas = [["a", "b"]];
const uniqueAreas = uniqueMatrixElements(layoutAreas);

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/UiChooser",
  component: UiChooser,
  argTypes: {
    area: {
      control: { type: "select", options: uniqueAreas },
    },
  },
} as ComponentMeta<typeof UiChooser>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UiChooser> = (args) => (
  <AreaLabeledGridHolder
    areas={layoutAreas}
    rowSizes={"400px"}
    colSizes={"400px"}
    gapSize={"1rem"}
  >
    <UiChooser {...args} />
  </AreaLabeledGridHolder>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  area: uniqueAreas[0],
};
