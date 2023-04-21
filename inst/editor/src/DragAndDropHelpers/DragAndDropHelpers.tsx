import type { NodePath } from "ui-node-definitions/src/NodePath";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";

export type DraggedNodeInfo = { node: ShinyUiNode; currentPath?: NodePath };
