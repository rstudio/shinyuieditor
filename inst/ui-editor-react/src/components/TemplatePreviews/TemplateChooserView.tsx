import Button from "components/Inputs/Button/Button";
import { EditorSkeleton, PanelHeader } from "EditorSkeleton/EditorSkeleton";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import { useFilteredTemplates } from "./filterTemplates";
import { TemplateFiltersForm } from "./TemplateFiltersForm";
import "./styles.scss";
import { TemplatePreviewGrid } from "./TemplatePreviewGrid";

export function TemplateChooserView({
  setTemplate,
}: {
  setTemplate: (tree: ShinyUiNode) => void;
}) {
  const { filterState, setFilterState, shownTemplates } =
    useFilteredTemplates();
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

            <OutputTypeField />

            <Button>Next</Button>
          </div>
        </>
      }
    />
  );
}

type OutputType = "single-file" | "multi-file";
const outputTypes: OutputType[] = ["single-file", "multi-file"];
const selectedOutput: OutputType = "single-file";
function OutputTypeField() {
  return (
    <form className="OutputTypeField">
      <legend>Generate app in:</legend>
      {outputTypes.map((outputType) => (
        <div key={outputType}>
          <input
            type="radio"
            id={`${outputType}-choice`}
            name={`${outputType} name`}
            value={`${outputType} value`}
            checked={outputType === selectedOutput}
          />
          <label htmlFor={`${outputType}-choice`}>{outputType}</label>
        </div>
      ))}
    </form>
  );
}
