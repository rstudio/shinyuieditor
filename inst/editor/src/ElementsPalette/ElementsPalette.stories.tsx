import React from "react";

import ReduxProvider from "../state/ReduxProvider";

import ElementsPalette from ".";

export default {
  title: "Elements Palette",
  component: ElementsPalette,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary = () => (
  <div
    style={{
      width: "var(--layout-elements-panel-w, 200px)",
      height: "90vh",
      outline: "1px solid grey",
      backgroundColor: "var(--light-grey)",
    }}
  >
    <ReduxProvider>
      <ElementsPalette />
    </ReduxProvider>
  </div>
);
