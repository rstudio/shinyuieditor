import { AppTour } from "AppTour";
import SvgShinyLogo from "components/Icons/ShinyLogo";
import { UndoRedoButtons } from "components/UndoRedoButtons/UndoRedoButtons";

export function AppHeader() {
  return (
    <header>
      <SvgShinyLogo className="shiny-logo" />
      <h1 className="app-title">Shiny UI Editor</h1>

      <div className="right">
        <AppTour />
        <div className="divider" />
        <UndoRedoButtons />
      </div>
    </header>
  );
}
