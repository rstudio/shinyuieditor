import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridlayoutTitlePanel from "components/shiny-ui/GridlayoutTitlePanel";
import React from "react";
import { GridHolder } from "../components/GridHolder";

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
  <GridHolder
    rows={["200px", "200px"]}
    columns={["200px", "200px"]}
    gap={"1rem"}
  >
    <GridlayoutTitlePanel {...args} />
  </GridHolder>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: "My App Title",
  area: "b",
};
