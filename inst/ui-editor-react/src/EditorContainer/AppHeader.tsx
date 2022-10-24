import { AppTour } from "AppTour";
import SvgShinyLogo from "components/Icons/ShinyLogo";
import { app_templates } from "components/TemplatePreviews/app_templates";
import { useRequestTemplate } from "components/TemplatePreviews/useRequestTemplate";
import { UndoRedoButtons } from "components/UndoRedoButtons/UndoRedoButtons";

export function AppHeader() {
  const requestTemplate = useRequestTemplate();

  return (
    <header>
      <SvgShinyLogo className="shiny-logo" />
      <h1 className="app-title">Shiny UI Editor</h1>
      <button
        onClick={() => {
          requestTemplate({ ...app_templates[0], outputType: "single-file" });
        }}
      >
        Template req
      </button>
      <div className="right">
        <AppTour />
        <div className="divider" />
        <UndoRedoButtons />
      </div>
    </header>
  );
}
