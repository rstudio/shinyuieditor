import React from "react";

import { useSelector } from "react-redux";

import { useCurrentSelection } from "../../../state/selectedPath";
import type { RootState } from "../../../state/store";
import type { NodePath } from "../../../ui-node-definitions/NodePath";
import type { ShinyUiNode } from "../../../ui-node-definitions/ShinyUiNode";
import { getNode } from "../../../ui-node-definitions/TreeManipulation/getNode";
import { samePath } from "../../../ui-node-definitions/TreeManipulation/samePath";
import { isKnownShinyUiNode } from "../../../ui-node-definitions/utils/isShinyUiNode";
import { makeChildPath } from "../../../ui-node-definitions/utils/nodePathUtils";
import { NodeWrapper } from "../../UiNode/NodeWraper";

import classes from "./Tabset.module.css";

type TabProps = {
  name: string;
  isActive: boolean;
  parentPath: NodePath;
  index: number;
  className: string;
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

export function Tab({
  name,
  isActive,
  index,
  parentPath,
  className,
}: TabProps) {
  const pathToTabPanel = makeChildPath(parentPath, index);

  const selectedPath = useCurrentSelection();
  const nodeForTab = useGetNode(pathToTabPanel);
  const isSelected = samePath(pathToTabPanel, selectedPath);

  return (
    <NodeWrapper
      className={className}
      data-active-tab={isActive}
      data-selected-tab={isSelected}
      wrapperProps={{
        node: nodeForTab,
        path: pathToTabPanel,
        canDrag: true,
      }}
      style={{ order: index }}
      aria-label={isActive ? `Active tab ${name}` : `Select ${name} tab`}
    >
      {name}
    </NodeWrapper>
  );
}
