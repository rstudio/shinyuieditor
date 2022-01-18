import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridApp from "components/Shiny-Ui-Elements/Layouts/GridApp";
import React from "react";
import { TemplatedGridProps } from "utils/gridTemplates/types";

const mainLayout: TemplatedGridProps = {
  areas: [
    ["title", "title"],
    ["settings", "plot"],
    ["footer", "footer"],
  ],
  rowSizes: ["100px", "350px", "100px"],
  colSizes: ["250px", "1fr"],
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/GridApp",
  component: GridApp,
} as ComponentMeta<typeof GridApp>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GridApp> = (args) => (
  <GridApp {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  layout: mainLayout,
  panels: {
    title: {
      uiName: "gridlayout::title_panel",
      uiArguments: { title: "My App" },
    },
    settings: {
      uiName: "shiny::sliderInput",
      uiArguments: { inputId: "mySlider", label: "My slider!" },
    },
    plot: {
      uiName: "shiny::plotOutput",
      uiArguments: { outputId: "MyPlot" },
    },
  },
};

export const Empty = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Empty.args = {
  layout: mainLayout,
  panels: {},
};
