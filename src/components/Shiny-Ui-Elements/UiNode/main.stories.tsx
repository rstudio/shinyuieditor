import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import UiNode from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/UiNode",
  component: UiNode,
} as ComponentMeta<typeof UiNode>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UiNode> = (args) => <UiNode {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  uiName: "gridlayout::grid_panel",
  uiArguments: { horizontalAlign: "center", verticalAlign: "center" },
  uiChildren: [
    {
      uiName: "gridlayout::grid_panel",
      uiArguments: { horizontalAlign: "right", verticalAlign: "center" },
      uiChildren: [
        {
          uiName: "shiny::plotOutput",
          uiArguments: { outputId: "myPlot" },
        },
      ],
    },
  ],
};
