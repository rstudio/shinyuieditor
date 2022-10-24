import React from "react";

import { app_templates } from "./app_templates";
import type { OutputType } from "./OutputTypeForm";
import type { LayoutType, TemplateInfo } from "./TemplatePreviewCard";
import { getLayoutType } from "./TemplatePreviewCard";
import { useRequestTemplate } from "./useRequestTemplate";

export const allLayoutTypes: LayoutType[] = ["grid", "navbarPage"];

export type TemplateFilterState = {
  layoutTypes: LayoutType[];
};
export type TemplateSelection = TemplateInfo & { outputType: OutputType };

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
  const requestTemplate = useRequestTemplate();

  const [filterState, setFilterState] = React.useState<TemplateFilterState>({
    layoutTypes: allLayoutTypes,
  });

  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(
    null
  );

  const [selectedOutput, setSelectedOutput] =
    React.useState<OutputType>("single-file");

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
    requestTemplate({ ...chosenTemplate, outputType: selectedOutput });
  };

  return {
    filterState,
    setFilterState,
    shownTemplates,
    selectedTemplate,
    setSelectedTemplate: setTemplateSelection,
    selectedOutput,
    setSelectedOutput,
    finishSelection,
  };
}
