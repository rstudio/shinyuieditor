import Button from "components/Inputs/Button/Button";
import { EditorSkeleton, PanelHeader } from "EditorSkeleton/EditorSkeleton";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import "./styles.scss";
import type { LayoutType } from "./TemplatePreviewCard";
import { TemplatePreviewGrid } from "./TemplatePreviewGrid";

export function TemplateChooserView({
  setTemplate,
}: {
  setTemplate: (tree: ShinyUiNode) => void;
}) {
  return (
    <EditorSkeleton
      main={<TemplatePreviewGrid setTemplate={setTemplate} />}
      left={<Sidebar />}
    />
  );
}

function Sidebar() {
  return (
    <>
      <PanelHeader>Choose App Template</PanelHeader>
      <form
        className="TemplateChooserSidebar"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <section className="instructions">
          Hover over a template to see a description and what elements are used.
          Select the desired template and click next to edit.
        </section>

        <LayoutFilters />

        <OutputTypeField />

        <Button>Next</Button>
      </form>
    </>
  );
}

const layoutTypes: LayoutType[] = ["grid", "navbarPage"];

const layoutLabels: Record<LayoutType, string> = {
  grid: "Grid",
  navbarPage: "Tabs",
};
function LayoutFilters() {
  return (
    <fieldset className="LayoutFiltersField">
      <legend>Show templates based on selected layouts:</legend>
      <div className="layout-options">
        {layoutTypes.map((layoutType) => {
          const displayName = layoutLabels[layoutType];
          return (
            <div className="option">
              <input
                type="checkbox"
                id={`${layoutType}-choice`}
                name={displayName}
                value={layoutType}
                checked
              />
              <label htmlFor={`${layoutType}-choice`}>{displayName}</label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

type OutputType = "single-file" | "multi-file";
const outputTypes: OutputType[] = ["single-file", "multi-file"];
const selectedOutput: OutputType = "single-file";
function OutputTypeField() {
  return (
    <fieldset className="OutputTypeField">
      <legend>Generate app in:</legend>
      {outputTypes.map((outputType) => (
        <div>
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
    </fieldset>
  );
}
