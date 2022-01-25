import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ElementsPalette from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/ElementsPalette",
  component: ElementsPalette,
} as ComponentMeta<typeof ElementsPalette>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ElementsPalette> = (args) => (
  <div
    style={{
      width: "150px",
      height: "100%",
      outline: "1px solid grey",
    }}
  >
    <ElementsPalette {...args} />
  </div>
);

export const Primary = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
