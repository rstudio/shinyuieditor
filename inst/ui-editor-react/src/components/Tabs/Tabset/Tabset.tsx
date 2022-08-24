import React from "react";

import PlusButton from "../../Inputs/PlusButton";

import { Tab } from "./Tab";
import classes from "./Tabset.module.css";
import { useActiveTab } from "./useActiveTab";

const Tabset: React.FC<{ title: string; onNewTab: () => void }> = ({
  title,
  onNewTab,
  children,
}) => {
  const tabNames = getTabNamesFromChildren(children);
  const { activeTab, setActiveTab } = useActiveTab(tabNames);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 className={classes.pageTitle}>{title}</h1>
        <div className={classes.tabs}>
          {tabNames.map((name) => (
            <Tab
              key={name}
              name={name}
              isActive={name === activeTab}
              onSelect={() => setActiveTab(name)}
            />
          ))}
          <PlusButton
            className={classes.addTabButton}
            label="Add new tab"
            onClick={onNewTab}
          />
        </div>
      </div>
      <div className={classes.tabContents}>
        {selectActiveTab(children, activeTab)}
      </div>
    </div>
  );
};

export default Tabset;

function getTabNamesFromChildren(children: React.ReactNode): string[] {
  let tabIds: string[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }
    const tabId = child.props.title;

    if (typeof tabId === "string") {
      tabIds.push(tabId);
    }
  });

  return tabIds;
}

function selectActiveTab(children: React.ReactNode, activeTab: string) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    const tabId = child.props.title;

    if (typeof tabId === "string") {
      return <div data-active-tab={tabId === activeTab}>{child}</div>;
    }

    return child;
  });
}
