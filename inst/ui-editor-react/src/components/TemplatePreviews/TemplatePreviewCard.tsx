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

const layoutIcons: Record<LayoutType, string> = {
  grid: gridIcon,
  navbarPage: navbarIcon,
};

export function TemplatePreviewCard({
  info: { title, templateTree },
  onSelect,
}: {
  info: TemplateInfo;
  onSelect: () => void;
}) {
  const layoutType: LayoutType =
    templateTree.uiName === "gridlayout::grid_page" ? "grid" : "navbarPage";
  const layoutIcon = layoutIcons[layoutType];

  return (
    <article className="AppTemplateCard" onClick={onSelect}>
      <div className="preview-container">
        <AppTemplatePreview templateTree={templateTree} width_px={225} />
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
