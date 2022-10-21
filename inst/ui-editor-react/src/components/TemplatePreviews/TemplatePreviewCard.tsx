import React from "react";

import gridIcon from "assets/icons/shinyGridContainer.png";
import navbarIcon from "assets/icons/tabsetPanel.png";
import { Tooltip } from "components/PopoverEl/Tooltip";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import { AppTemplatePreview } from "./AppTemplatePreview";

export type TemplateInfo = {
  title: string;
  templateTree: ShinyUiNode;
  description: string;
};

export type LayoutType = "grid" | "navbarPage";

export function getLayoutType(layoutTree: ShinyUiNode): LayoutType {
  return layoutTree.uiName === "gridlayout::grid_page" ? "grid" : "navbarPage";
}

const layoutIcons: Record<LayoutType, string> = {
  grid: gridIcon,
  navbarPage: navbarIcon,
};

const PADDING_PX = 5;

const inlineVariableStyles = {
  "--card-pad": `${PADDING_PX}px`,
} as React.CSSProperties;
export function TemplatePreviewCard({
  info: { title, templateTree },
  onSelect,
  width_px,
}: {
  info: TemplateInfo;
  onSelect: () => void;
  width_px: number;
}) {
  const layoutType = getLayoutType(templateTree);
  const layoutIcon = layoutIcons[layoutType];

  const preview_view_w_px = width_px - 2 * PADDING_PX;

  return (
    <article
      className="AppTemplateCard"
      onClick={onSelect}
      style={inlineVariableStyles}
    >
      <div className="preview-container">
        <AppTemplatePreview
          templateTree={templateTree}
          width_px={preview_view_w_px}
        />
      </div>
      <footer>
        <span>{title}</span>

        <Tooltip text={`${layoutType} layout app`}>
          <img
            src={layoutIcon}
            alt={`${layoutType} layout icon`}
            className="layout-icon"
          />
        </Tooltip>
      </footer>
    </article>
  );
}
