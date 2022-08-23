import React from "react";

import Tabset from "./Tabset";

export default {
  title: "Tabset",
  component: Tabset,
};

export const Primary = () => {
  return (
    <Tabset
      pageTitle="My Tabset Page"
      onNewTab={() => {
        console.log("New tab requested!");
      }}
    >
      <div data-tab-id="tab 1">Tab 1 content</div>
      <div data-tab-id="tab 2">Tab 2 content</div>
    </Tabset>
  );
};
