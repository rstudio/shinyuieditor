import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import UiTree from ".";
import ElementsPalette from "../ElementsPalette";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/UiTree",
  component: UiTree,
} as ComponentMeta<typeof UiTree>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UiTree> = (args) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "150px 1fr",
      height: "100%",
      gap: "2rem",
    }}
  >
    <div
      style={{
        outline: "1px solid grey",
        padding: "5px",
      }}
    >
      <h2>Elements Palette</h2>
      <ElementsPalette />
    </div>

    <UiTree {...args} />
  </div>
);

export const Primary = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  uiName: "container",
  uiArguments: { horizontalAlign: "center", verticalAlign: "center" },
  uiChildren: [
    {
      uiName: "container",
      uiArguments: { horizontalAlign: "center", verticalAlign: "center" },
      uiChildren: [
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider",
            label: "slider 1",
            min: 1,
            max: 10,
            value: 7,
          },
        },
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider",
            label: "slider 2",
            min: 1,
            max: 10,
            value: 7,
          },
        },
      ],
    },
    {
      uiName: "container",
      uiArguments: { horizontalAlign: "right", verticalAlign: "center" },
      uiChildren: [
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "myPlot",
          },
        },
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider",
            label: "slider",
            min: 1,
            max: 10,
            value: 7,
          },
        },
      ],
    },
  ],
};
