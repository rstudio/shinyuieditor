import React from "react";

import type { NodePath } from "ui-node-definitions/src/NodePath";
import { makeChildPath } from "ui-node-definitions/src/nodePathUtils";
import type { ShinyUiParentNode } from "ui-node-definitions/src/ShinyUiNode";
import type {
  ShinyUiNodeIds,
  KnownShinyUiNode,
  NodeInfoByRPackage,
} from "ui-node-definitions/src/uiNodeTypes";

import UiNode from "../../../components/UiNode/UiNode";
import { DropWatcherPanel } from "../../../DragAndDropHelpers/DropWatcherPanel";

import styles from "./CardUtils.module.css";

export function CardChildrenWithDropNodes({
  parentid,
  children = [],
  path,
  dropPanelClass = styles.drop_watcher,
  messageOnHover,
  showOnEmpty,
}: {
  parentid: ShinyUiNodeIds;
  messageOnHover: string;
  dropPanelClass?: string;
  children?: ShinyUiParentNode["children"];
  path: NodePath;
  showOnEmpty?: React.ReactNode;
}) {
  return (
    <>
      <DropWatcherPanel
        className={dropPanelClass}
        child_loc={0}
        parentPath={path}
        parentNodeType={parentid}
        messageOnHover={messageOnHover}
      >
        {children.length === 0 ? showOnEmpty : null}
      </DropWatcherPanel>
      {children.map((childNode, i) => (
        <React.Fragment key={path.join(".") + i}>
          <UiNode path={makeChildPath(path, i)} node={childNode} />
          <DropWatcherPanel
            className={dropPanelClass}
            child_loc={i + 1}
            parentPath={path}
            parentNodeType={parentid}
            messageOnHover={messageOnHover}
          />
        </React.Fragment>
      ))}
    </>
  );
}

// Find the Ui nodes that have a height argument in them
type NodesWithHeightSettings = Exclude<
  {
    [Node in KnownShinyUiNode as Node["id"]]: Node["namedArgs"] extends {
      height?: any;
    }
      ? Node["id"]
      : never;
  }[KnownShinyUiNode["id"]],
  // Ignore bslib specific nodes
  NodeInfoByRPackage["bslib"]["id"]
>;

// This is here to spit a typescript error if we add a new node with a height
// property so we know to add it to `CardUtils.module.css` and the flex-targeted
// children
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const nodes_that_can_flex: Record<NodesWithHeightSettings, true> = {
  DTOutput: true,
  plotlyOutput: true,
  plotOutput: true,
};
