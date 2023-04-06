import React from "react";

import UiNode from "../../../components/UiNode/UiNode";
import { DropWatcherPanel } from "../../../DragAndDropHelpers/DropWatcherPanel";
import { makeChildPath } from "../../nodePathUtils";
import type {
  KnownShinyUiNode,
  NodePath,
  ShinyUiNodeNames,
  ShinyUiParentNode,
} from "../../uiNodeTypes";

import styles from "./CardUtils.module.css";

export function CardChildrenWithDropNodes({
  parentid,
  children = [],
  path,
  dropPanelClass = styles.drop_watcher,
  messageOnHover,
  showOnEmpty,
}: {
  parentid: ShinyUiNodeNames;
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
  `bslib::card_${string}`
>;

// This is here to spit a typescript error if we add a new node with a height
// property so we know to add it to `CardUtils.module.css` and the flex-targeted
// children
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const nodes_that_can_flex: Record<NodesWithHeightSettings, true> = {
  "DT::DTOutput": true,
  "plotly::plotlyOutput": true,
  "shiny::plotOutput": true,
};
