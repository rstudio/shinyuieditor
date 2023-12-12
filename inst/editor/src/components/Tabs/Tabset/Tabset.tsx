import React from "react";

import { FaPlus } from "react-icons/fa";
import { seqArray } from "util-functions/src/arrays";

import { useCurrentSelection } from "../../../state/selectedPath";
import { usePlaceNode } from "../../../state/usePlaceNode";
import type { NodePath } from "../../../ui-node-definitions/NodePath";
import type { ShinyUiNode } from "../../../ui-node-definitions/ShinyUiNode";
import { nodeDepth } from "../../../ui-node-definitions/TreeManipulation/nodeDepth";
import { makeChildPath } from "../../../ui-node-definitions/utils/nodePathUtils";
import { mergeClasses } from "../../../utils/mergeClasses";
import { PopoverButton } from "../../Inputs/PopoverButton";

import { Tab } from "./Tab";
import { TabDropDetector } from "./TabDropDetector";
import classes from "./Tabset.module.css";
import { useActiveTab } from "./useActiveTab";

interface TabsetProps extends React.ComponentPropsWithoutRef<"div"> {
  title?: string;
  addTabButton?: JSX.Element;
}

function useTabSelections({
  children,
  path,
}: {
  children: React.ReactNode;
  path: NodePath;
}) {
  const tabNames = getTabNamesFromChildren(children);
  const selectedPath = useCurrentSelection();

  const { activeTab, setActiveTab } = useActiveTab(tabNames.length);
  const place_node = usePlaceNode();

  React.useEffect(() => {
    // Make sure that we have the proper tab active so that the selected node is
    // visible
    const pathOfActiveTab = makeChildPath(path, activeTab);

    if (!selectedPath) return;

    const depth_of_active_tab = nodeDepth(pathOfActiveTab);
    const depth_of_selection = nodeDepth(selectedPath);

    const selectedNodeIsDeeperThanActiveTab =
      depth_of_selection >= depth_of_active_tab;

    if (selectedNodeIsDeeperThanActiveTab) {
      const index_of_tab_containing_selection =
        selectedPath[nodeDepth(pathOfActiveTab) - 1];

      if (typeof index_of_tab_containing_selection !== "number") {
        // Probably selected something like the sidebar;
        return;
      }

      setActiveTab(index_of_tab_containing_selection);
    }
  }, [activeTab, path, selectedPath, setActiveTab]);

  const add_tab: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    place_node({
      path: makeChildPath(path, tabNames.length),
      node: emptyTabPanel,
    });
  };
  return {
    tabNames,
    add_tab,
    activeTab,
  };
}

function Tabset({
  path,
  title,
  children,
  sidebar,
  className = "",
  ...divProps
}: TabsetProps & { path: NodePath; sidebar?: JSX.Element }) {
  const { tabNames, activeTab, add_tab } = useTabSelections({
    children,
    path,
  });
  return (
    <div className={mergeClasses(className, classes.container)} {...divProps}>
      {sidebar}
      <div className={classes.header}>
        <h1 className={classes.pageTitle}>{title}</h1>
        <div
          className={mergeClasses("flex items-end")}
          aria-label="tabs container"
        >
          {tabNames.map((name, i) => (
            <Tab
              key={name + i}
              name={name}
              parentPath={path}
              className={mergeClasses(
                "grid content-center px-2 py-1 h-5/6 text-center cursor-pointer max-w-[200px] shrink-0",
                i === activeTab
                  ? "bg-rstudio-white border-b-rstudio-white"
                  : "bg-gray-300",
                classes.tab
              )}
              isActive={i === activeTab}
              index={i}
            />
          ))}
          {seqArray(tabNames.length).map((i) => (
            <TabDropDetector
              key={i}
              parentPath={path}
              index={i}
              baseWidth="10px"
            />
          ))}
          <TabDropDetector
            parentPath={path}
            index={tabNames.length}
            baseWidth="25px"
          >
            <PlusButton
              className={classes.addTabButton}
              label="Add new tab"
              onClick={add_tab}
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

const emptyTabPanel: ShinyUiNode = {
  id: "nav_panel",
  namedArgs: { title: "Empty Tab" },
  children: [],
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
      variant={["icon", "transparent"]}
      className={className}
      placement="bottom-start"
      aria-label={label}
      popoverContent={label}
      onClick={onClick}
    >
      <FaPlus
        style={{
          display: "block",
        }}
      />
    </PopoverButton>
  );
}
