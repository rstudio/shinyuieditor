import Button from "components/Inputs/Button/Button";
import { EditorSkeleton, PanelHeader } from "EditorSkeleton/EditorSkeleton";

import type { TemplateSelection } from "./filterTemplates";
import { useFilteredTemplates } from "./filterTemplates";
import { OutputTypeForm } from "./OutputTypeForm";
import "./styles.scss";
import { TemplateFiltersForm } from "./TemplateFiltersForm";
import { TemplatePreviewGrid } from "./TemplatePreviewGrid";

export function TemplateChooserView({
  onChoose,
}: {
  onChoose: (selection: TemplateSelection) => void;
}) {
  const {
    filterState,
    setFilterState,
    shownTemplates,
    selectedTemplate,
    setSelectedTemplate,
    finishSelection,
    selectedOutput,
    setSelectedOutput,
  } = useFilteredTemplates(onChoose);

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
