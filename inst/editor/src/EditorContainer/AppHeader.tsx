import { AppTour } from "../AppTour";
import SvgShinyLogo from "../components/Icons/ShinyLogo";
import { UndoRedoButtons } from "../components/UndoRedoButtons/UndoRedoButtons";
import { useRuntimeType } from "../state/runtimeInfo";

import { OpenSideBySideWindowButton } from "./OpenSideBySideWindowButton";

export function AppHeader() {
  const runtimeType = useRuntimeType();

  return (
    <header>
      <SvgShinyLogo className="shiny-logo" />
      <h1 className="app-title">Shiny UI Editor</h1>

      <div className="right">
        {runtimeType === "VSCODE" ? <OpenSideBySideWindowButton /> : null}
        <AppTour />
        <div className="divider" />
        <UndoRedoButtons />
      </div>
    </header>
  );
}
