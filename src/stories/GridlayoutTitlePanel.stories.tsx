import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridlayoutTitlePanel from "components/shiny-ui/GridlayoutTitlePanel";
import React from "react";
import { AreaLabeledGridHolder } from "../components/GridHolder";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/TitlePanel",
  component: GridlayoutTitlePanel,
  argTypes: {
    title: { control: "text" },
  },
} as ComponentMeta<typeof GridlayoutTitlePanel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GridlayoutTitlePanel> = (args) => (
  <AreaLabeledGridHolder
    areas={[
      ["a", "a", "b"],
      ["c", "d", "d"],
    ]}
    rowSizes={"200px"}
    colSizes={"200px"}
    gapSize={"1rem"}
  >
    <GridlayoutTitlePanel {...args} />
  </AreaLabeledGridHolder>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: "My App Title",
  area: "a",
};
