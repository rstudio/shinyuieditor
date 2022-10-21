import Button from "components/Inputs/Button/Button";
import { EditorSkeleton, PanelHeader } from "EditorSkeleton/EditorSkeleton";

import { useFilteredTemplates } from "./filterTemplates";
import { OutputTypeForm, useOutputTypeChooser } from "./OutputTypeForm";
import "./styles.scss";
import { TemplateFiltersForm } from "./TemplateFiltersForm";
import type { TemplateInfo } from "./TemplatePreviewCard";
import { TemplatePreviewGrid } from "./TemplatePreviewGrid";

export function TemplateChooserView({
  onChoose,
}: {
  onChoose: (template: TemplateInfo) => void;
}) {
  const {
    filterState,
    setFilterState,
    shownTemplates,
    selectedTemplate,
    setSelectedTemplate,
    finishSelection,
  } = useFilteredTemplates(onChoose);

  const { selectedOutput, setSelectedOutput } = useOutputTypeChooser();

  const canProceed = selectedTemplate !== null;

  return (
    <EditorSkeleton
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

            <OutputTypeForm
              selectedOutput={selectedOutput}
              setSelectedOutput={setSelectedOutput}
            />

            <Button
              disabled={!canProceed}
              onClick={finishSelection}
              aria-label={
                canProceed
                  ? "Choose selected template"
                  : "Need to select a template to proceed"
              }
              data-balloon-pos="right"
            >
              Next
            </Button>
          </div>
        </>
      }
    />
  );
}
