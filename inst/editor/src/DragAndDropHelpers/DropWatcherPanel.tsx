import React from "react";

import type { PathElement, NodePath } from "ui-node-definitions/src/NodePath";
import { makeChildPath } from "ui-node-definitions/src/nodePathUtils";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";
import { getIsValidMove } from "ui-node-definitions/src/TreeManipulation/getIsValidMove";
import type { Wrapping_Node } from "ui-node-definitions/src/TreeManipulation/wrapInNode";
import type { ShinyUiNodeIds } from "ui-node-definitions/src/uiNodeTypes";
import { getUiNodeTitle } from "ui-node-definitions/src/uiNodeTypes";
import { getUiNodeInfo } from "ui-node-definitions/src/uiNodeTypes";

import Button from "../components/Inputs/Button/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/PopoverEl/FloatingPopover";
import UiNode from "../components/UiNode/UiNode";
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
  child_loc?: PathElement;

  /**
   * Class name to apply to the div. This gets added to an existing class that
   * is relatively lightweight but provides good default styles.
   */
  className?: string;
  /**
   * id of the parent node. This is used to determine if the node being
   * dropped is allowed to be dropped here or not.
   */
  parentNodeType: ShinyUiNodeIds;
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
   * At least how tall should this drop area be when it's available to be
   * dropped on?
   */
  minHeightOnAvailable?: string;

  /**
   * By default an empty drop watcher is not visible unless it's a viable drop
   * target for a dragged node. This can be overwridden with this property
   */
  visibleWhenEmpty?: boolean;

  /**
   * Filters for what nodes can be dropped here. If not provided, all nodes are
   * allowed. If provided, only nodes that match the filter are allowed.
   */
  dropFilters?: { rejected: ShinyUiNodeIds[] } | { accepted: ShinyUiNodeIds[] };

  /**
   * Arguments to pass to the drop handler. This is useful if you want to
   * override the default behavior of the drop handler. E.g. if you want to
   * perform custom wrapping behavior etc..
   */
  dropHandlerArgs?: Partial<DropHandlerArguments>;
};

export function DropWatcherPanel({
  existing_node,
  child_loc = 0,
  parentNodeType: parentNodeid,
  parentPath,
  dropHandlerArgs,
  className = "",
  wrappingNode,
  dropFilters,
  messageOnHover = "Drop to add",
  visibleWhenEmpty = false,
  minHeightOnAvailable = existing_node ? "fit-content" : "15px",
  style = {},
  children,
  ...divProps
}: DropWatcherPanelProps &
  Omit<React.ComponentPropsWithoutRef<"div">, "className">) {
  const [replacementNode, setReplacementNode] =
    React.useState<DraggedNodeInfo | null>(null);

  const place_node = usePlaceNode();

  const merged_styles = React.useMemo(
    () => ({
      ...style,
      "--active-target-height": minHeightOnAvailable,
    }),
    [minHeightOnAvailable, style]
  );

  const finish_drop = React.useCallback(
    (nodeInfo: DraggedNodeInfo) => {
      place_node({
        ...nodeInfo,
        path: makeChildPath(parentPath, child_loc),
        wrappingNode,
      });
      setReplacementNode(null);
    },
    [child_loc, parentPath, place_node, wrappingNode]
  );

  const ref = useFilteredDrop({
    onDrop: (nodeInfo) => {
      if (existing_node) {
        // if we have an existing node, we should prompt the user to confirm they really do want to replace it
        setReplacementNode(nodeInfo);
      } else {
        finish_drop(nodeInfo);
      }
    },
    getCanAcceptDrop: (nodeInfo: DraggedNodeInfo) =>
      getIsValidMove({
        fromPath: nodeInfo.currentPath,
        toPath: [...parentPath, child_loc],
      }) &&
      isAllowedParent({
        dragged: nodeInfo.node.id,
        parent: parentNodeid,
      }) &&
      isDropFilterAccepted(nodeInfo, dropFilters),
    ...dropHandlerArgs,
  });

  return (
    <Tooltip open={replacementNode !== null}>
      <TooltipTrigger asChild>
        <div
          ref={ref}
          className={mergeClasses(styles.drop_watcher_panel, className)}
          {...divProps}
          style={merged_styles}
          data-index={child_loc}
          data-messageonhover={messageOnHover}
          data-visiblewhenempty={visibleWhenEmpty ? "true" : null}
        >
          {existing_node ? (
            <UiNode
              path={makeChildPath(parentPath, child_loc)}
              node={existing_node}
            />
          ) : null}
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <ReplaceNodeDialog
          existing_node={existing_node}
          replacementNode={replacementNode}
          on_yes={() => finish_drop(replacementNode!)}
          on_no={() => setReplacementNode(null)}
        />
      </TooltipContent>
    </Tooltip>
  );
}

function ReplaceNodeDialog({
  existing_node,
  replacementNode,
  on_yes,
  on_no,
}: {
  existing_node: ShinyUiNode | undefined;
  replacementNode: DraggedNodeInfo | null;
  on_yes: () => void;
  on_no: () => void;
}) {
  if (!existing_node || !replacementNode) return null;

  const existing_node_name = getUiNodeTitle(existing_node.id);
  const replacement_node_name = getUiNodeTitle(replacementNode.node.id);

  return (
    <div className={styles.replace_node_question} role="dialog">
      <p>
        Are you sure you want to replace the existing{" "}
        <strong>{existing_node_name}</strong> with{" "}
        <strong>{replacement_node_name}</strong>?
      </p>
      <div className={styles.button_container} role="group">
        <Button onClick={on_yes}>Yes</Button>
        <Button onClick={on_no}>No</Button>
      </div>
    </div>
  );
}

/**
 * Does the dragged node satisfy the drop filters for the watcher panel, if they exist?
 * @param nodeInfo Info about the dragged node
 * @param dropFilters The drop filters for the watcher panel
 * @returns True if the dragged node satisfies the drop filters
 */
function isDropFilterAccepted(
  nodeInfo: DraggedNodeInfo,
  dropFilters: DropWatcherPanelProps["dropFilters"]
): boolean {
  if (!dropFilters) return true;

  if ("accepted" in dropFilters) {
    return nodeInfo.node.id in dropFilters.accepted;
  } else {
    return !(nodeInfo.node.id in dropFilters.rejected);
  }
}

/**
 * Is the dragged node allowed to be dropped on the parent node?
 * @param node_names The names of the dragged node and the parent node
 * @param node_names.dragged The name of the dragged node
 * @param node_names.parent The name of the parent node
 * @returns True if the dragged node can be dropped on the parent node
 */
function isAllowedParent(node_names: {
  dragged: string;
  parent: ShinyUiNodeIds;
}): boolean {
  const draggedNodeInfo = getUiNodeInfo(node_names.dragged);

  const has_allowed_parents_filters = "allowedParents" in draggedNodeInfo;

  if (
    has_allowed_parents_filters &&
    Array.isArray(draggedNodeInfo.allowedParents)
  ) {
    return draggedNodeInfo.allowedParents.includes(node_names.parent);
  }

  return true;
}
