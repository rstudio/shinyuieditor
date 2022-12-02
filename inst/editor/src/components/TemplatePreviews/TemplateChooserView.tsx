import type { MessageToClientByPath } from "communication-types";

import {
  EditorSkeleton,
  PanelHeader,
} from "../../EditorSkeleton/EditorSkeleton";
import Button from "../Inputs/Button/Button";

import { useFilteredTemplates } from "./filterTemplates";
import { OutputTypeForm } from "./OutputTypeForm";
import "./styles.scss";
import { TemplateFiltersForm } from "./TemplateFiltersForm";
import { TemplatePreviewGrid } from "./TemplatePreviewGrid";

export type TemplateChooserOptions = {
  outputChoices: MessageToClientByPath["TEMPLATE_CHOOSER"];
};
export function TemplateChooserView(opts: TemplateChooserOptions) {
  const {
    filterState,
    setFilterState,
    shownTemplates,
    selectedTemplate,
    setSelectedTemplate,
    finishSelection,
    selectedOutput,
    setSelectedOutput,
  } = useFilteredTemplates(opts);

  const canProceed = selectedTemplate !== null;
  const buttonMsg = canProceed ? "Next" : "Select a template";

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

            {opts.outputChoices === "USER-CHOICE" ? (
              <OutputTypeForm
                selectedOutput={selectedOutput}
                setSelectedOutput={setSelectedOutput}
              />
            ) : null}

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
