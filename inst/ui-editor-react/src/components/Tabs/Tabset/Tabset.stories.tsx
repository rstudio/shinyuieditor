import React from "react";

import type { ComponentMeta } from "@storybook/react";

import TabPanel from "../TabPanel/TabPanel";

import Tabset from "./Tabset";

export default {
  title: "Tabset",
  component: Tabset,
  decorators: [
    (Story) => (
      <div
        style={{ outline: "2px solid silver", height: "850px", margin: "10px" }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Tabset>;

export const Primary = () => {
  const [currentTabs, setCurrentTabs] = React.useState<string[]>([
    "tab 1",
    "tab 2",
  ]);

  const addTab = () => {
    setCurrentTabs((existingTabs) => [
      ...existingTabs,
      `tab ${existingTabs.length + 1}`,
    ]);
  };
  return (
    <Tabset pageTitle="My Tabset Page" onNewTab={addTab}>
      {currentTabs.map((name) => (
        <TabPanel key={name} title={name}>
          Contents for {name}
        </TabPanel>
      ))}
    </Tabset>
  );
};
