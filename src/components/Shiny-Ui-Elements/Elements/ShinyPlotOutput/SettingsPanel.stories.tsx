import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ShinyPlotOutputSettings } from "./SettingsPanel";
import UiSettingsComponent from "components/Shiny-Ui-Elements/UiPanel/SettingsPanelPopover";
import { ShinyUiSettingsComponent } from "components/Shiny-Ui-Elements/Elements/componentTypes";
import { ShinyPlotOutputProps } from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/ShinyPlotOutput/SettingsPanel",
  component: UiSettingsComponent,
} as ComponentMeta<typeof UiSettingsComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<
  ShinyUiSettingsComponent<ShinyPlotOutputProps>
> = (args) => {
  return (
    <div
      style={{ width: "400px", height: "400px", outline: "1px solid black" }}
    >
      <UiSettingsComponent SettingsInputs={ShinyPlotOutputSettings} {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  startingSettings: {
    name: "mySlider",
    width: "400px",
    height: "300px",
  },
  onUpdate: (newSettings) => console.log(newSettings),
};
