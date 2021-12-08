import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridApp from "components/shiny-ui/GridApp";
import React from "react";
import { ConfigureNewUiPanel } from "./ConfigureNewUiPanel";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "NewItemConfiguration",
  component: ConfigureNewUiPanel,
} as ComponentMeta<typeof GridApp>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ConfigureNewUiPanel> = (args) => (
  <div style={{ width: "500px", outline: "1px solid grey", padding: "10px" }}>
    <ConfigureNewUiPanel {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  existingElementNames: ["header", "plot"],
};
