import type { NodePath } from "../ui-node-definitions/NodePath";
import type { ShinyUiNode } from "../ui-node-definitions/ShinyUiNode";

export type DraggedNodeInfo = { node: ShinyUiNode; currentPath?: NodePath };
