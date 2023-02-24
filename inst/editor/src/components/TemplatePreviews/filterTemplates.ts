import React from "react";

import type { TemplateInfo } from "communication-types/src/AppTemplates";

import { app_templates } from "../../assets/app-templates/app_templates";
import type { App_Type } from "../../ast_parsing";
import { ui_node_to_R_code } from "../../ast_parsing/code_generation/ui_node_to_R_code";

import type { TemplateChooserOptions } from "./TemplateChooserView";
import type { LayoutType } from "./TemplatePreviewCard";
import { getLayoutType } from "./TemplatePreviewCard";
import { useRequestTemplate } from "./useRequestTemplate";

export const allLayoutTypes: LayoutType[] = ["grid", "navbarPage"];

export type TemplateFilterState = {
  layoutTypes: LayoutType[];
};
export type TemplateSelection = Omit<TemplateInfo, "title" | "description"> & {
  outputType: App_Type;
};

function filteredTemplates(filters: TemplateFilterState): TemplateInfo[] {
  return app_templates.filter(({ uiTree }) => {
    const layoutType = getLayoutType(uiTree);
    if (!filters.layoutTypes.includes(layoutType)) return false;

    return true;
  });
}

export function useFilteredTemplates({
  outputChoices,
}: TemplateChooserOptions) {
  const requestTemplate = useRequestTemplate();

  const [filterState, setFilterState] = React.useState<TemplateFilterState>({
    layoutTypes: allLayoutTypes,
  });

  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(
    null
  );

  const [selectedOutput, setSelectedOutput] = React.useState<App_Type>(
    outputChoices === "USER-CHOICE" ? "SINGLE-FILE" : outputChoices
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

    const template_ui_code = ui_node_to_R_code(chosenTemplate.uiTree, {
      remove_namespace: true,
    });

    requestTemplate({
      ...chosenTemplate,
      ...template_ui_code,
      outputType: selectedOutput,
    });
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
