import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import UiTree from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/UiTree",
  component: UiTree,
} as ComponentMeta<typeof UiTree>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UiTree> = (args) => <UiTree {...args} />;

export const Primary = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  containerSettings: { horizontalAlign: "center", verticalAlign: "center" },
  uiChildren: [
    {
      containerSettings: { horizontalAlign: "right", verticalAlign: "center" },
      uiChildren: [
        {
          uiInfo: {
            uiName: "shiny::plotOutput",
            uiArguments: {
              outputId: "myPlot",
            },
          },
        },
        {
          uiInfo: {
            uiName: "shiny::sliderInput",
            uiArguments: {
              inputId: "mySlider",
              label: "slider",
              min: 1,
              max: 10,
              value: 7,
            },
          },
        },
      ],
    },
  ],
};
