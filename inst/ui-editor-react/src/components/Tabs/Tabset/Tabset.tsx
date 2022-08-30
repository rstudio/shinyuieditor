import React from "react";

import { NewTabButtonWithDropDetection } from "components/Tabs/Tabset/NewTabButtonWithDropDetection";
import { nodeDepth } from "components/UiNode/TreeManipulation/nodeDepth";
import { nodesAreDirectAncestors } from "components/UiNode/TreeManipulation/nodesAreDirectAncestors";
import { samePath } from "components/UiNode/TreeManipulation/samePath";
import { useNodeSelectionState } from "NodeSelectionState";
import { makeChildPath } from "Shiny-Ui-Elements/nodePathUtils";
import {
  newTabPanelNode,
  wrapNodeInTabPanel,
} from "Shiny-Ui-Elements/ShinyNavbarPage/ShinyNavbarPage";
import type { NodePath, ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";
import { usePlaceNode } from "state/uiTree";

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
  const numChildren = tabNames.length;
  const [selectedPath, setSelectedPath] = useNodeSelectionState();

  const onTabSelect = (tabIndex: number) =>
    setSelectedPath(makeChildPath(path, tabIndex));
  const { activeTab, setActiveTab } = useActiveTab(tabNames.length);
  const place_node = usePlaceNode();

  const addNewTab = (node?: ShinyUiNode) => {
    place_node({
      node: node ? wrapNodeInTabPanel(node) : newTabPanelNode,
      path: makeChildPath(path, numChildren),
    });
  };

  React.useEffect(() => {
    // Make sure that we have the proper tab active so that the selected node is
    // visible
    const pathOfActiveTab = makeChildPath(path, activeTab);

    if (!selectedPath) return;

    if (nodesAreDirectAncestors(pathOfActiveTab, selectedPath)) {
      return;
    }

    const selectedNodeIsDeeperThanActiveTab =
      nodeDepth(selectedPath) >= nodeDepth(pathOfActiveTab);

    if (selectedNodeIsDeeperThanActiveTab) {
      setActiveTab(selectedPath[nodeDepth(pathOfActiveTab) - 1]);
    }
  }, [activeTab, path, selectedPath, setActiveTab]);

  return (
    <div className={[className, classes.container].join(" ")} {...divProps}>
      <div className={classes.header}>
        <h1 className={classes.pageTitle}>{title}</h1>
        <div className={classes.tabs} aria-label="tabs container">
          {tabNames.map((name, i) => (
            <Tab
              key={name + i}
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
              onNewTab={addNewTab}
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
