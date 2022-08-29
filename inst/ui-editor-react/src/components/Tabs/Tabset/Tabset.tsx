import React from "react";

import PlusButton from "components/Inputs/PlusButton";

import { Tab } from "./Tab";
import classes from "./Tabset.module.css";
import { useActiveTab } from "./useActiveTab";

export interface TabsetProps extends React.ComponentPropsWithoutRef<"div"> {
  title: string;
  onNewTab: () => void;
  onTabSelect?: (tabIndex: number) => void;
  addTabButton?: JSX.Element;
}

const Tabset = React.forwardRef<HTMLDivElement, TabsetProps>(
  (
    {
      title,
      onNewTab,
      children,
      onTabSelect,
      addTabButton = (
        <PlusButton
          className={classes.addTabButton}
          label="Add new tab"
          onClick={onNewTab}
        />
      ),
      ...divProps
    },
    ref
  ) => {
    const tabNames = getTabNamesFromChildren(children);
    const { activeTab, setActiveTab } = useActiveTab(tabNames.length);

    return (
      <div ref={ref} className={classes.container} {...divProps}>
        <div className={classes.header}>
          <h1 className={classes.pageTitle}>{title}</h1>
          <div className={classes.tabs}>
            {tabNames.map((name, i) => (
              <Tab
                key={name}
                name={name}
                isActive={i === activeTab}
                onSelect={() => {
                  setActiveTab(i);
                  onTabSelect?.(i);
                }}
              />
            ))}
            <div className={classes.addTabButtonContainer}>{addTabButton}</div>
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

function selectActiveTab(children: React.ReactNode, activeTab: number) {
  return React.Children.map(children, (child, i) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    const tabId = child.props.title;

    if (typeof tabId === "string") {
      return (
        <div className={classes.tabContents} data-active-tab={i === activeTab}>
          {child}
        </div>
      );
    }

    return child;
  });
}
