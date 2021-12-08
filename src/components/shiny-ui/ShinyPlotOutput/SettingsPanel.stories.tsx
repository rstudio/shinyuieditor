import { ComponentMeta, ComponentStory } from "@storybook/react";
import type { ShinyPlotOutputProps } from "components/shiny-ui/ShinyPlotOutput";

import React from "react";
import { ShinyUiSettingsComponent } from "../componentTypes";
import UiSettingsComponent from "../GridApp/SettingsPanelPopover";
import { ShinyPlotOutputSettingsOptions } from "./SettingsPanel";

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
      <UiSettingsComponent
        SettingsInputs={ShinyPlotOutputSettingsOptions}
        {...args}
      />
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
