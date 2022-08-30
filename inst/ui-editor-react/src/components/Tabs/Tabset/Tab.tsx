import React from "react";

import { samePath } from "components/UiNode/TreeManipulation/samePath";
import { useMakeWrapperProps } from "components/UiNode/useMakeWrapperProps";
import { useNodeSelectionState } from "NodeSelectionState";
import { makeChildPath } from "Shiny-Ui-Elements/nodePathUtils";
import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";
import { useGetNode } from "state/uiTree";

import classes from "./Tabset.module.css";

type TabProps = {
  name: string;
  isActive: boolean;
  parentPath: NodePath;
  index: number;
};

export const Tab = ({ name, isActive, index, parentPath }: TabProps) => {
  const pathToTabPanel = makeChildPath(parentPath, index);

  const [selectedPath] = useNodeSelectionState();
  const nodeForTab = useGetNode(pathToTabPanel);
  const wrapperProps = useMakeWrapperProps(nodeForTab, pathToTabPanel);

  // console.log(`Tab at index ${index} for node`, nodeForTab);

  const isSelected = samePath(pathToTabPanel, selectedPath);

  return (
    <div
      className={classes.tab}
      data-active-tab={isActive}
      data-selected-tab={isSelected}
      {...wrapperProps}
      aria-label={isActive ? `Active tab ${name}` : `Select ${name} tab`}
    >
      {name}
    </div>
  );
};
