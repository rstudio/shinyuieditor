import { ComponentMeta, ComponentStory } from "@storybook/react";
import GridApp from "components/shiny-ui/GridApp";
import React from "react";
import { TemplatedGridProps } from "utils/parseGridTemplateAreas";

const mainLayout: TemplatedGridProps = {
  areas: [
    ["a", "a", "b", "other"],
    ["c", "d", "d", "other"],
  ],
  rowSizes: ["200px", "300px"],
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
    a: {
      componentName: "titlePanel",
      componentProps: { title: "My App" },
    },
    b: {
      componentName: "sliderInput",
      componentProps: { name: "My slider!" },
    },
    d: {
      componentName: "plotOutput",
      componentProps: { name: "My Plot!" },
    },
  },
};
