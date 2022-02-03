import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ConfigureNewUiElement from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "NewItemConfiguration",
  component: ConfigureNewUiElement,
} as ComponentMeta<typeof ConfigureNewUiElement>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ConfigureNewUiElement> = (args) => (
  <div style={{ width: "500px", outline: "1px solid grey", padding: "10px" }}>
    <ConfigureNewUiElement {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  existingElementNames: ["header", "plot"],
};
