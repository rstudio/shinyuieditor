import React from "react";

import type { ComponentMeta, ComponentStory } from "@storybook/react";
import GridlayoutTitlePanel from "components/Shiny-Ui-Elements/GridlayoutTitlePanel";
import { uniqueMatrixElements } from "utils/matrix-helpers";

const layoutAreas = [
  ["a", "a", "b", "other"],
  ["c", "d", "d", "other"],
];
const uniqueAreas = uniqueMatrixElements(layoutAreas);

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ShinyUI/GridlayoutTitlePanel/main",
  component: GridlayoutTitlePanel,
  argTypes: {
    area: {
      control: { type: "select", options: uniqueAreas },
    },
  },
} as ComponentMeta<typeof GridlayoutTitlePanel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GridlayoutTitlePanel> = (args) => (
  <div>
    <GridlayoutTitlePanel {...args} />
  </div>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  uiArguments: {
    title: "My App Title",
    area: uniqueAreas[0],
  },
};
