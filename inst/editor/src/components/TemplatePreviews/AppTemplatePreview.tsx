import React from "react";

import UiNode from "../UiNode/UiNode";

import "./styles.scss";
import type { ShinyUiNode } from "../../ui-node-definitions/ShinyUiNode";

// This is the size that we render the preview at before shrinking it down
const FULL_WIDTH_PX = 1260;
const FULL_HEIGHT_PX = 800;

export function AppTemplatePreview({
  uiTree,
  width_px,
}: {
  width_px: number;
  uiTree: ShinyUiNode;
}) {
  const height_px = FULL_HEIGHT_PX * (width_px / FULL_WIDTH_PX);
  const shrink_ratio = width_px / FULL_WIDTH_PX;
  return (
    <div
      className="AppTemplatePreview"
      style={
        {
          width: `${width_px}px`,
          height: `${height_px}px`,
          "--full-w": `${FULL_WIDTH_PX}px`,
          "--full-h": `${FULL_HEIGHT_PX}px`,
          "--shrink-ratio": shrink_ratio,
        } as React.CSSProperties
      }
    >
      <div className="template-container">
        <UiNode path={[]} node={uiTree} />
      </div>
    </div>
  );
}
