import React from "react";

import PlusButton from "../../Inputs/PlusButton";

import { Tab } from "./Tab";
import classes from "./Tabset.module.css";
import { useActiveTab } from "./useActiveTab";

type TabsetProps = {
  title: string;
  onNewTab: () => void;
  onTabSelect: (tabIndex: number) => void;
  children?: React.ReactNode;
};

const Tabset = React.forwardRef<HTMLDivElement, TabsetProps>(
  ({ title, onNewTab, children, onTabSelect }, ref) => {
    const tabNames = getTabNamesFromChildren(children);
    const { activeTab, setActiveTab } = useActiveTab(tabNames);

    return (
      <div ref={ref} className={classes.container}>
        <div className={classes.header}>
          <h1 className={classes.pageTitle}>{title}</h1>
          <div className={classes.tabs}>
            {tabNames.map((name, i) => (
              <Tab
                key={name}
                name={name}
                isActive={name === activeTab}
                onSelect={() => {
                  setActiveTab(name);
                  onTabSelect(i);
                }}
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
  }
);

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
      return (
        <div
          className={classes.tabContents}
          data-active-tab={tabId === activeTab}
        >
          {child}
        </div>
      );
    }

    return child;
  });
}
