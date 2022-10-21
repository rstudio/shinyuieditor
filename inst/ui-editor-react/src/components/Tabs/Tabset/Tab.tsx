import React from "react";

import { getNode } from "components/UiNode/TreeManipulation/getNode";
import { samePath } from "components/UiNode/TreeManipulation/samePath";
import { useMakeWrapperProps } from "components/UiNode/useMakeWrapperProps";
import { useNodeSelectionState } from "NodeSelectionState";
import { useSelector } from "react-redux";
import { isShinyUiNode } from "Shiny-Ui-Elements/isShinyUiNode";
import { makeChildPath } from "Shiny-Ui-Elements/nodePathUtils";
import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";
import type { RootState } from "state/store";

import classes from "./Tabset.module.css";

type TabProps = {
  name: string;
  isActive: boolean;
  parentPath: NodePath;
  index: number;
};

function useGetNode(path: NodePath) {
  const uiTree = useSelector((state: RootState) => state.uiTree);

  if (!isShinyUiNode(uiTree)) {
    throw new Error("Tried to get path of node in template chooser mode");
  }

  const node = React.useMemo(() => getNode(uiTree, path), [path, uiTree]);

  return node;
}
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
      style={{ order: index }}
      aria-label={isActive ? `Active tab ${name}` : `Select ${name} tab`}
    >
      {name}
    </div>
  );
};
