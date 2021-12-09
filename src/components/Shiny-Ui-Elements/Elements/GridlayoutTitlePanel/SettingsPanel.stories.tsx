import { ComponentMeta, ComponentStory } from "@storybook/react";
import { GridlayoutTitlePanelProps } from "components/Shiny-Ui-Elements/Elements/GridlayoutTitlePanel";
import { GridlayoutTitlePanelSettings } from "components/Shiny-Ui-Elements/Elements/GridlayoutTitlePanel/SettingsPanel";
import React from "react";
import { ShinyUiSettingsComponent } from "../componentTypes";
import UiSettingsComponent from "../../UiPanel/SettingsPanelPopover";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/GridlayoutTitlePanel/SettingsPanel",
  component: UiSettingsComponent,
} as ComponentMeta<typeof UiSettingsComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<
  ShinyUiSettingsComponent<GridlayoutTitlePanelProps>
> = (args) => (
  <div style={{ width: "400px", height: "400px", outline: "1px solid black" }}>
    <UiSettingsComponent
      SettingsInputs={GridlayoutTitlePanelSettings}
      {...args}
    />
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
