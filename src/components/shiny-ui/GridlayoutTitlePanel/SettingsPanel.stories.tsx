import { ComponentMeta, ComponentStory } from "@storybook/react";
import { GridlayoutTitlePanelProps } from "components/shiny-ui/GridlayoutTitlePanel";
import GridlayoutTitlePanelSettings from "components/shiny-ui/GridlayoutTitlePanel/SettingsPanel";
import React from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/GridlayoutTitlePanel/SettingsPanel",
  component: GridlayoutTitlePanelSettings,
} as ComponentMeta<typeof GridlayoutTitlePanelSettings>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GridlayoutTitlePanelSettings> = (
  args
) => (
  <div style={{ width: "400px", height: "400px", outline: "1px solid black" }}>
    <GridlayoutTitlePanelSettings {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  startingSettings: {
    title: "myApp",
  },
  onUpdate: (newSettings: GridlayoutTitlePanelProps) =>
    console.log(newSettings),
};
