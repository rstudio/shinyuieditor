import React from "react";

import { useSelector } from "react-redux";

import { isKnownShinyUiNode } from "../../../Shiny-Ui-Elements/isShinyUiNode";
import { makeChildPath } from "../../../Shiny-Ui-Elements/nodePathUtils";
import type {
  NodePath,
  ShinyUiNode,
} from "../../../Shiny-Ui-Elements/uiNodeTypes";
import { useCurrentSelection } from "../../../state/selectedPath";
import type { RootState } from "../../../state/store";
import { getNode } from "../../UiNode/TreeManipulation/getNode";
import { samePath } from "../../UiNode/TreeManipulation/samePath";
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
