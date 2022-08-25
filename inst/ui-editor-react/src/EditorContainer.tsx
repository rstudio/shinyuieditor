import * as React from "react";

import AppPreview from "components/AppPreview";
import SvgShinyLogo from "components/Icons/ShinyLogo";
import UiNode from "components/UiNode";
import { UndoRedoButtons } from "components/UndoRedoButtons/UndoRedoButtons";
import { CurrentDraggedNodeProvider } from "DragAndDropHelpers/useCurrentDraggedNode";
import ElementsPalette from "ElementsPalette";
import PortalModal from "PortalModal";
import { useSelector } from "react-redux";
import type { RootState } from "state/store";

import { AppTour } from "./AppTour";
import classes from "./EditorContainer.module.css";
import { SettingsPanel } from "./SettingsPanel/SettingsPanel";
import { useSyncUiWithBackend } from "./websocket_hooks/useSyncUiWithBackend";

export const PROPERTIES_PANEL_WIDTH_PX = 236;

const sizes_inline_styles = {
  "--properties-panel-width": `${PROPERTIES_PANEL_WIDTH_PX}px`,
} as React.CSSProperties;

export function EditorContainer() {
  const { status, tree } = useSyncUiWithBackend();

  if (status === "loading") {
    return <LoadingMessage />;
  }

  return (
    <CurrentDraggedNodeProvider>
      <div className={classes.container} style={sizes_inline_styles}>
        <div className={classes.header}>
          <SvgShinyLogo
            className={classes.shinyLogo}
            style={{ backgroundColor: "var(--rstudio-blue, pink)" }}
          />
          <h1 className={classes.title}>Shiny UI Editor2</h1>
          <div className={classes.rightSide}>
            <AppTour />
            <div className={classes.divider} />
            <UndoRedoButtons />
          </div>
        </div>
        <div
          className={`${classes.elementsPanel} ${classes.titledPanel} elements-panel`}
        >
          <h3 className={classes.panelTitleHeader}>Elements</h3>
          <ElementsPalette />
        </div>
        <div className={classes.editorHolder + " app-view"}>
          <UiNode {...tree} />
        </div>
        <div className={`${classes.propertiesPanel}`}>
          <div className={`${classes.titledPanel} properties-panel`}>
            <h3 className={classes.panelTitleHeader}>Properties</h3>
            <SettingsPanel tree={tree} />
          </div>
          <div className={`${classes.titledPanel} app-preview`}>
            <AppPreview />
          </div>
        </div>
      </div>
      <LostConnectionPopup />
    </CurrentDraggedNodeProvider>
  );
}

function LoadingMessage() {
  return <h3>Loading initial state from server</h3>;
}

function LostConnectionPopup() {
  const connectedToServer = useSelector(
    (state: RootState) => state.connectedToServer
  );

  if (connectedToServer) return null;

  return (
    <PortalModal
      onConfirm={() => console.log("User confirmed")}
      onCancel={() => console.log("user canceled")}
    >
      <p style={{ color: "var(--red, pink)", textAlign: "center" }}>
        Lost connection to backend. Check console where editor was launched for
        details.
      </p>
    </PortalModal>
  );
}
