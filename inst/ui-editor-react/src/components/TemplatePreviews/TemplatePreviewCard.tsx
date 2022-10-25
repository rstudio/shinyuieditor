import React from "react";

import gridIcon from "assets/icons/shinyGridContainer.png";
import navbarIcon from "assets/icons/tabsetPanel.png";
import { PopoverEl } from "components/PopoverEl/PopoverEl";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import { AppTemplatePreview } from "./AppTemplatePreview";

/**
 * Defines basic information needed to build an app template for the template viewer
 */
export type TemplateInfo = {
  /**
   * Displayed name of the template in the chooser view
   */
  title: string;
  /** Long form description of the template available on hover. This can use
   * markdown formatting
   */
  description: string;
  /**
   * Main tree definining the template. Used for generating preview and also the
   * main ui definition of the template
   */
  uiTree: ShinyUiNode;
  otherCode: {
    /**
     * Extra code that will be copied unchanged above the ui definition
     */
    uiExtra?: string;

    /**
     * List of libraries that need to be loaded in server code
     */
    serverLibraries?: string[];

    /**
     * Extra code that will be copied unchanged above server funtion definition
     */
    serverExtra?: string;

    /**
     * Body of server function. This will be wrapped in the code
     * `function(input, output){....}`
     */
    serverFunctionBody?: string;
  };
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
    <PopoverEl
      placement="bottom"
      popoverContent={description}
      openDelayMs={400}
      triggerEl={
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
      }
    />
  );
}
