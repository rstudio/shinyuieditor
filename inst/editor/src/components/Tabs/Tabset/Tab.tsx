import React from "react";

import { useSelector } from "react-redux";
import { isKnownShinyUiNode } from "ui-node-definitions/src/isShinyUiNode";
import type { NodePath } from "ui-node-definitions/src/NodePath";
import { makeChildPath } from "ui-node-definitions/src/nodePathUtils";
import { getNode } from "ui-node-definitions/src/TreeManipulation/getNode";
import { samePath } from "ui-node-definitions/src/TreeManipulation/samePath";
import type { ShinyUiNode } from "ui-node-definitions/src/uiNodeTypes";

import { useCurrentSelection } from "../../../state/selectedPath";
import type { RootState } from "../../../state/store";
import { useMakeWrapperProps } from "../../UiNode/useMakeWrapperProps";

import classes from "./Tabset.module.css";

type TabProps = {
  name: string;
  isActive: boolean;
  parentPath: NodePath;
  index: number;
};

const dummyNode: ShinyUiNode = {
  id: "unknownUiFunction",
  namedArgs: {
    text: "Dummy ui node for app previews",
  },
};

function useGetNode(path: NodePath) {
  const uiTree = useSelector((state: RootState) => state.app_info);

  const node = React.useMemo(() => {
    if (!isKnownShinyUiNode(uiTree)) return dummyNode;
    return getNode(uiTree, path);
  }, [path, uiTree]);

  return node;
}
export const Tab = ({ name, isActive, index, parentPath }: TabProps) => {
  const pathToTabPanel = makeChildPath(parentPath, index);

  const selectedPath = useCurrentSelection();
  const nodeForTab = useGetNode(pathToTabPanel);
  const wrapperProps = useMakeWrapperProps({
    node: nodeForTab,
    path: pathToTabPanel,
    canDrag: true,
  });

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
