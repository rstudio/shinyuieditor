import React from "react";

import Button from "../components/Inputs/Button/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/PopoverEl/FloatingPopover";
import { getIsValidMove } from "../components/UiNode/TreeManipulation/getIsValidMove";
import type { Wrapping_Node } from "../components/UiNode/TreeManipulation/wrapInNode";
import UiNode from "../components/UiNode/UiNode";
import { makeChildPath } from "../Shiny-Ui-Elements/nodePathUtils";
import type {
  NodePath,
  PathElement,
  ShinyUiNode,
  ShinyUiNodeNames,
} from "../Shiny-Ui-Elements/uiNodeTypes";
import { getUiNodeInfo } from "../Shiny-Ui-Elements/uiNodeTypes";
import { usePlaceNode } from "../state/usePlaceNode";
import { mergeClasses } from "../utils/mergeClasses";

import type { DraggedNodeInfo } from "./DragAndDropHelpers";
import styles from "./DropWatcherPanel.module.css";
import type { DropHandlerArguments } from "./useFilteredDrop";
import { useFilteredDrop } from "./useFilteredDrop";

/**
 * Props for drop watcher panel
 */
export type DropWatcherPanelProps = {
  /**
   * Ui Node that may already exist in this child location. This will be
   * rendered and will be able to be replaced by dropping another node on it
   */
  existing_node?: ShinyUiNode;
  /**
   * The location of the child in the parent node. E.g. number 2 for the 3rd
   * child or "value" for value argument of the node
   */
  child_loc: PathElement;

  /**
   * Class name to apply to the div. This gets added to an existing class that
   * is relatively lightweight but provides good default styles.
   */
  className?: string;
  /**
   * UiName of the parent node. This is used to determine if the node being
   * dropped is allowed to be dropped here or not.
   */
  parentNodeType: ShinyUiNodeNames;
  /**
   * Path to the parent node. Is combined with `child_loc` to create the final
   * path for a dropped node. Also used for determining if drop is valid for
   * children
   */
  parentPath: NodePath;
  /**
   * Optional node to wrap the dropped node in.
   */
  wrappingNode?: Wrapping_Node;
  /**
   * What message is shown over the drop area when a node is hovered over it?
   * Can be used to give descriptive messages to the user about what a drop will
   * do
   */
  messageOnHover?: string;

  /**
   * Filters for what nodes can be dropped here. If not provided, all nodes are
   * allowed. If provided, only nodes that match the filter are allowed.
   */
  dropFilters?:
    | { rejected: ShinyUiNodeNames[] }
    | { accepted: ShinyUiNodeNames[] };

  /**
   * Arguments to pass to the drop handler. This is useful if you want to
   * override the default behavior of the drop handler. E.g. if you want to
   * perform custom wrapping behavior etc..
   */
  dropHandlerArgs?: Partial<DropHandlerArguments>;
};

export function DropWatcherPanel({
  existing_node,
  child_loc: index,
  parentNodeType,
  parentPath,
  dropHandlerArgs,
  className = "",
  wrappingNode,
  dropFilters,
  messageOnHover = "Drop to add",
  ...divProps
}: DropWatcherPanelProps &
  Omit<React.ComponentPropsWithoutRef<"div">, "className">) {
  const has_existing_node = !!existing_node;

  const [replacementNode, setReplacementNode] =
    React.useState<DraggedNodeInfo | null>(null);

  const place_node = usePlaceNode();

  const finish_drop = React.useCallback(
    (nodeInfo: DraggedNodeInfo) => {
      place_node({
        ...nodeInfo,
        path: makeChildPath(parentPath, index),
        wrappingNode,
      });
      setReplacementNode(null);
    },
    [index, parentPath, place_node, wrappingNode]
  );

  const ref = useFilteredDrop({
    onDrop: (nodeInfo) => {
      if (has_existing_node) {
        // if we have an existing node, we should prompt the user to confirm they really do want to replace it
        setReplacementNode(nodeInfo);
      } else {
        finish_drop(nodeInfo);
      }
    },
    getCanAcceptDrop: (nodeInfo: DraggedNodeInfo) => {
      const { node, currentPath } = nodeInfo;

      // First check that this move makes sense navigationally. E.g. were not
      // trying to move a node into it's own children or something
      if (
        !getIsValidMove({
          fromPath: currentPath,
          toPath: [...parentPath, index],
        })
      ) {
        return false;
      }

      const draggedNodeInfo = getUiNodeInfo(node.uiName);
      if (
        "allowedParents" in draggedNodeInfo &&
        !draggedNodeInfo.allowedParents?.includes(parentNodeType)
      ) {
        return false;
      }

      if (!dropFilters) return true;

      if ("accepted" in dropFilters) {
        return node.uiName in dropFilters.accepted;
      } else {
        return !(node.uiName in dropFilters.rejected);
      }
    },
    ...dropHandlerArgs,
  });

  return (
    <Tooltip open={replacementNode !== null}>
      <TooltipTrigger asChild>
        <div
          ref={ref}
          className={mergeClasses(styles.drop_watcher_panel, className)}
          {...divProps}
          data-index={index}
          data-messageOnHover={messageOnHover}
        >
          {existing_node ? (
            <UiNode
              path={makeChildPath(parentPath, index)}
              node={existing_node}
            />
          ) : null}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className={styles.replace_node_question}>
          <p>
            Are you sure you want to replace{" "}
            <strong>{existing_node?.uiName}</strong> with{" "}
            <strong>{replacementNode?.node.uiName}</strong>?
          </p>
          <div className={styles.button_container}>
            <Button onClick={() => finish_drop(replacementNode!)}>Yes</Button>
            <Button onClick={() => setReplacementNode(null)}>No</Button>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
