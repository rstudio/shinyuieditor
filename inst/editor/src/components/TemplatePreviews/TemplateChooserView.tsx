import type { MessageToClientByPath } from "communication-types";

import { EditorLayout } from "../../EditorLayout/EditorLayout";
import { PanelHeader } from "../../EditorLayout/PanelHeader";
import Button from "../Inputs/Button/Button";

import { useFilteredTemplates } from "./filterTemplates";
import "./styles.scss";
import { TemplateFiltersForm } from "./TemplateFiltersForm";
import { TemplatePreviewGrid } from "./TemplatePreviewGrid";

export type TemplateChooserOptions = {};
export function TemplateChooserView(opts: TemplateChooserOptions) {
  const {
    filterState,
    setFilterState,
    shownTemplates,
    selectedTemplate,
    setSelectedTemplate,
    finishSelection,
  } = useFilteredTemplates(opts);

  const canProceed = selectedTemplate !== null;
  const buttonMsg = canProceed ? "Next" : "Select a template";

  return (
    <EditorLayout
      main={
        <TemplatePreviewGrid
          templates={shownTemplates}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
      }
      left={
        <>
          <PanelHeader>Choose App Template</PanelHeader>
          <div className="TemplateChooserSidebar">
            <section className="instructions">
              Hover over a template to see a description and what elements are
              used. Select the desired template and click next to edit.
            </section>

            <TemplateFiltersForm
              filterState={filterState}
              setFilterState={setFilterState}
            />

            <Button
              disabled={!canProceed}
              onClick={finishSelection}
              aria-label={
                canProceed
                  ? "Start editor with selected template"
                  : "Need to select a template to proceed"
              }
              data-balloon-pos="right"
            >
              {buttonMsg}
            </Button>
          </div>
        </>
      }
    />
  );
}
