import React from "react";

import { samePath } from "components/UiNode/TreeManipulation/samePath";
import { useNodeSelectionState } from "NodeSelectionState";
import { makeChildPath } from "Shiny-Ui-Elements/nodePathUtils";
import { NewTabButtonWithDropDetection } from "Shiny-Ui-Elements/ShinyNavbarPage/NewTabButtonWithDropDetection";
import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";

import { Tab } from "./Tab";
import classes from "./Tabset.module.css";
import { useActiveTab } from "./useActiveTab";

export interface TabsetProps extends React.ComponentPropsWithoutRef<"div"> {
  title: string;
  addTabButton?: JSX.Element;
}

function Tabset({
  path,
  title,
  children,
  className = "",
  ...divProps
}: TabsetProps & { path: NodePath }) {
  const tabNames = getTabNamesFromChildren(children);
  const [selectedPath, setSelectedPath] = useNodeSelectionState();

  const onTabSelect = (tabIndex: number) =>
    setSelectedPath(makeChildPath(path, tabIndex));
  const { activeTab, setActiveTab } = useActiveTab(tabNames.length);

  return (
    <div className={[className, classes.container].join(" ")} {...divProps}>
      <div className={classes.header}>
        <h1 className={classes.pageTitle}>{title}</h1>
        <div className={classes.tabs}>
          {tabNames.map((name, i) => (
            <Tab
              key={name}
              name={name}
              isActive={i === activeTab}
              isSelected={samePath(makeChildPath(path, i), selectedPath)}
              onSelect={() => {
                setActiveTab(i);
                onTabSelect?.(i);
              }}
            />
          ))}
          <div className={classes.addTabButtonContainer}>
            <NewTabButtonWithDropDetection
              path={path}
              numSiblings={tabNames.length}
            />
          </div>
        </div>
      </div>
      <div className={classes.tabContents}>
        {selectActiveTab(children, activeTab)}
      </div>
    </div>
  );
}

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
