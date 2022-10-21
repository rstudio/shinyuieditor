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

export function useFilteredTemplates(
  onChoose: (template: TemplateInfo) => void
) {
  const [filterState, setFilterState] = React.useState<TemplateFilterState>({
    layoutTypes: allLayoutTypes,
  });

  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(
    null
  );

  const setTemplateSelection = (title: string) => {
    setSelectedTemplate((currentSelection) =>
      currentSelection === title ? null : title
    );
  };

  const shownTemplates = React.useMemo(
    () => filteredTemplates(filterState),
    [filterState]
  );

  // If the selected template was filtered out of the options, reset selection
  React.useEffect(() => {
    if (
      selectedTemplate &&
      !shownTemplates.map((t) => t.title).includes(selectedTemplate)
    ) {
      setSelectedTemplate(null);
    }
  }, [selectedTemplate, shownTemplates]);

  const finishSelection = () => {
    const chosenTemplate = shownTemplates.find(
      ({ title }) => title === selectedTemplate
    );

    if (!chosenTemplate) return;

    onChoose(chosenTemplate);
  };

  return {
    filterState,
    setFilterState,
    shownTemplates,
    selectedTemplate,
    setSelectedTemplate: setTemplateSelection,
    finishSelection,
  };
}
