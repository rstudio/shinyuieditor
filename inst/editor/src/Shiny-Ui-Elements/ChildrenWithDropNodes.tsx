import React from "react";

import type { NodePath } from "ui-node-definitions/src/NodePath";
import { makeChildPath } from "ui-node-definitions/src/nodePathUtils";
import type { ShinyUiParentNode } from "ui-node-definitions/src/ShinyUiNode";
import type {
  ShinyUiNodeIds,
  KnownShinyUiNode,
  NodeInfoByRPackage,
} from "ui-node-definitions/src/uiNodeTypes";

import UiNode from "../components/UiNode/UiNode";
import { DropWatcherPanel } from "../DragAndDropHelpers/DropWatcherPanel";

import styles from "./ChildrenWithDropNodes.module.css";

/**
 * Render Ui Children along with drop nodes between children. Used in situations
 * where nodes are sequentially rendered like in card bodies etc..
 * @param args
 *  @param args.parentid - The id of the parent node
 *  @param args.children - The children to render
 *  @param args.path - The path to the parent node
 *  @param args.dropPanelClass - The class to apply to the drop panel
 *  @param args.messageOnHover - The message to display when hovering over the drop panel
 *  @param args.showOnEmpty - Element to show when there's no children
 *
 * @returns A react fragment containing the children and drop nodes
 */
export function ChildrenWithDropNodes({
  parentid,
  children = [],
  parentPath,
  dropPanelClass = styles.drop_watcher,
  messageOnHover,
  showOnEmpty,
}: {
  parentid: ShinyUiNodeIds;
  messageOnHover: string;
  dropPanelClass?: string;
  children?: ShinyUiParentNode["children"];
  parentPath: NodePath;
  showOnEmpty?: React.ReactNode;
}) {
  return (
    <>
      <DropWatcherPanel
        className={dropPanelClass}
        child_loc={0}
        parentPath={parentPath}
        parentNodeType={parentid}
        messageOnHover={messageOnHover}
      >
        {children.length === 0 ? showOnEmpty : null}
      </DropWatcherPanel>
      {children.map((childNode, i) => (
        <React.Fragment key={parentPath.join(".") + i}>
          <UiNode path={makeChildPath(parentPath, i)} node={childNode} />
          <DropWatcherPanel
            className={dropPanelClass}
            child_loc={i + 1}
            parentPath={parentPath}
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
