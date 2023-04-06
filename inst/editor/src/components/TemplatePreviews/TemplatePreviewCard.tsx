import React from "react";

import type { TemplateInfo } from "communication-types/src/AppTemplates";

import gridIcon from "../../assets/icons/shinyGridContainer.png";
import navbarIcon from "../../assets/icons/tabsetPanel.png";
import type { ShinyUiNode } from "../../Shiny-Ui-Elements/uiNodeTypes";
import {
  MarkdownTooltipContent,
  Tooltip,
  TooltipTrigger,
} from "../PopoverEl/FloatingPopover";

import { AppTemplatePreview } from "./AppTemplatePreview";

export type LayoutType = "grid" | "navbarPage";

export function getLayoutType(layoutTree: ShinyUiNode): LayoutType {
  return layoutTree.id === "grid_page" ? "grid" : "navbarPage";
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
  info: { title, uiTree, description },
  onSelect,
  width_px,
  selected,
}: {
  info: TemplateInfo;
  onSelect: () => void;
  width_px: number;
  selected: boolean;
}) {
  const layoutType = getLayoutType(uiTree);
  const layoutIcon = layoutIcons[layoutType];

  const preview_view_w_px = width_px - 2 * PADDING_PX;

  return (
    <Tooltip placement="bottom">
      <TooltipTrigger asChild>
        <article
          className="AppTemplateCard"
          aria-label="App template preview card"
          onClick={onSelect}
          style={inlineVariableStyles}
          data-selected={selected}
        >
          <div className="preview-container">
            <AppTemplatePreview uiTree={uiTree} width_px={preview_view_w_px} />
          </div>
          <footer>
            <span>{title}</span>
            <img
              src={layoutIcon}
              alt={`${layoutType} layout icon`}
              title={`${layoutType} layout app`}
              className="layout-icon"
            />
          </footer>
        </article>
      </TooltipTrigger>
      <MarkdownTooltipContent content={description} />
    </Tooltip>
  );
}
