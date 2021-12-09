import { ComponentMeta, ComponentStory } from "@storybook/react";
import UiChooser from "components/Shiny-Ui-Elements/UiChooser";
import React from "react";
import { uniqueMatrixElements } from "utils/matrix-helpers";
import { LabeledGridHolder } from "../../LabeledGridHolder";

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
  <LabeledGridHolder
    areas={layoutAreas}
    rowSizes={"400px"}
    colSizes={"400px"}
    gapSize={"1rem"}
  >
    <UiChooser {...args} />
  </LabeledGridHolder>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  area: uniqueAreas[0],
};
