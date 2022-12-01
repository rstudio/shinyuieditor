import { AppTour } from "../AppTour";
import SvgShinyLogo from "../components/Icons/ShinyLogo";
import { UndoRedoButtons } from "../components/UndoRedoButtons/UndoRedoButtons";
import { useInTemplateChooserMode } from "../state/useInTemplateChooserMode";

import { OpenSideBySideWindowButton } from "./OpenSideBySideWindowButton";

export function AppHeader() {
  const inTemplateChooserMode = useInTemplateChooserMode();

  return (
    <header>
      <SvgShinyLogo className="shiny-logo" />
      <h1 className="app-title">Shiny UI Editor</h1>
      <div className="right">
        {!inTemplateChooserMode ? (
          <>
            <OpenSideBySideWindowButton />
            <AppTour />
          </>
        ) : null}
        <div className="divider" />
        <UndoRedoButtons />
        <div className="spacer last" />
      </div>
    </header>
  );
}
