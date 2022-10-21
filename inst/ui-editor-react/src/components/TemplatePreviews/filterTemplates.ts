import React from "react";

import { app_templates } from "./app_templates";
import type { LayoutType, TemplateInfo } from "./TemplatePreviewCard";
import { getLayoutType } from "./TemplatePreviewCard";

export const allLayoutTypes: LayoutType[] = ["grid", "navbarPage"];

export type TemplateFilterState = {
  layoutTypes: LayoutType[];
};

export function filteredTemplates(
  filters: TemplateFilterState
): TemplateInfo[] {
  return app_templates.filter(({ title, templateTree, description }) => {
    const layoutType = getLayoutType(templateTree);
    if (!filters.layoutTypes.includes(layoutType)) return false;

    return true;
  });
}

export function useFilteredTemplates() {
  const [filterState, setFilterState] = React.useState<TemplateFilterState>({
    layoutTypes: allLayoutTypes,
  });

  const shownTemplates = filteredTemplates(filterState);

  return { filterState, setFilterState, shownTemplates };
}
