import React from "react";

import { FaPlus } from "react-icons/fa";

import type { ShinyUiNode } from "../../../main";
import { makeChildPath } from "../../../Shiny-Ui-Elements/nodePathUtils";
import type { NodePath } from "../../../Shiny-Ui-Elements/uiNodeTypes";
import { useCurrentSelection } from "../../../state/selectedPath";
import { usePlaceNode } from "../../../state/usePlaceNode";
import { seqArray } from "../../../utils/array-helpers";
import { mergeClasses } from "../../../utils/mergeClasses";
import { PopoverButton } from "../../Inputs/PopoverButton";
import { nodeDepth } from "../../UiNode/TreeManipulation/nodeDepth";

import { Tab } from "./Tab";
import { TabDropDetector } from "./TabDropDetector";
import classes from "./Tabset.module.css";
import { useActiveTab } from "./useActiveTab";

interface TabsetProps extends React.ComponentPropsWithoutRef<"div"> {
  title?: string;
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
  const selectedPath = useCurrentSelection();

  const { activeTab, setActiveTab } = useActiveTab(tabNames.length);
  const place_node = usePlaceNode();

  React.useEffect(() => {
    // Make sure that we have the proper tab active so that the selected node is
    // visible
    const pathOfActiveTab = makeChildPath(path, activeTab);

    if (!selectedPath) return;

    const selectedNodeIsDeeperThanActiveTab =
      nodeDepth(selectedPath) >= nodeDepth(pathOfActiveTab);

    if (selectedNodeIsDeeperThanActiveTab) {
      setActiveTab(selectedPath[nodeDepth(pathOfActiveTab) - 1]);
    }
  }, [activeTab, path, selectedPath, setActiveTab]);

  return (
    <div className={mergeClasses(className, classes.container)} {...divProps}>
      <div className={classes.header}>
        <h1 className={classes.pageTitle}>{title}</h1>
        <div className={classes.tabHolder} aria-label="tabs container">
          {tabNames.map((name, i) => (
            <Tab
              key={name + i}
              name={name}
              parentPath={path}
              isActive={i === activeTab}
              index={i}
            />
          ))}
          {seqArray(numChildren).map((i) => (
            <TabDropDetector
              key={i}
              parentPath={path}
              index={i}
              baseWidth="10px"
            />
          ))}
          <TabDropDetector
            parentPath={path}
            index={numChildren}
            baseWidth="25px"
          >
            <PlusButton
              className={classes.addTabButton}
              label="Add new tab"
              onClick={(e) => {
                e.stopPropagation();
                place_node({
                  path: makeChildPath(path, numChildren),
                  node: emptyTabPanel,
                });
              }}
            />
          </TabDropDetector>
        </div>
      </div>
      <div className={classes.tabContents}>
        {selectActiveTab(children, activeTab)}
      </div>
    </div>
  );
}

const emptyTabPanel = {
  uiName: "shiny::tabPanel",
  uiArguments: { title: "Empty Tab" },
  uiChildren: [],
} satisfies ShinyUiNode;


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

const ButtonStyle: React.CSSProperties = {
  display: "block",
};

function PlusButton({
  label,
  onClick,
  className,
}: {
  className?: string;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <PopoverButton
      className={className}
      placement="bottom"
      aria-label={label}
      popoverContent={label}
      onClick={onClick}
      openDelayMs={0}
    >
      <FaPlus style={ButtonStyle} />
    </PopoverButton>
  );
}
