import Button from "components/Inputs/Button/Button";
import { EditorSkeleton, PanelHeader } from "EditorSkeleton/EditorSkeleton";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import { useFilteredTemplates } from "./filterTemplates";
import { OutputTypeForm, useOutputTypeChooser } from "./OutputTypeForm";
import "./styles.scss";
import { TemplateFiltersForm } from "./TemplateFiltersForm";
import { TemplatePreviewGrid } from "./TemplatePreviewGrid";

export function TemplateChooserView({
  setTemplate,
}: {
  setTemplate: (tree: ShinyUiNode) => void;
}) {
  const { filterState, setFilterState, shownTemplates } =
    useFilteredTemplates();

  const { selectedOutput, setSelectedOutput } = useOutputTypeChooser();

  return (
    <EditorSkeleton
      main={
        <TemplatePreviewGrid
          templates={shownTemplates}
          setTemplate={setTemplate}
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

            <Button>Next</Button>
          </div>
        </>
      }
    />
  );
}
