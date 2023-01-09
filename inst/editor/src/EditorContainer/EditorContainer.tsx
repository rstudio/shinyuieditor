import React from "react";

import { AppTour } from "../AppTour";
import { useSyncUiWithBackend } from "../backendCommunication/useSyncUiWithBackend";
import AppPreview from "../components/AppPreview";
import SvgShinyLogo from "../components/Icons/ShinyLogo";
import { TemplateChooserView } from "../components/TemplatePreviews/TemplateChooserView";
import UiNode from "../components/UiNode/UiNode";
import { UndoRedoButtons } from "../components/UndoRedoButtons/UndoRedoButtons";
import { CurrentDraggedNodeProvider } from "../DragAndDropHelpers/useCurrentDraggedNode";
import {
  EditorSkeleton,
  PROPERTIES_PANEL_WIDTH_PX,
} from "../EditorSkeleton/EditorSkeleton";
import { LostConnectionPopup } from "../EditorSkeleton/LostConnectionPopup";
import ElementsPalette from "../ElementsPalette";
import { SettingsPanel } from "../SettingsPanel/SettingsPanel";

import { DialogPopover } from "./DialogPopover";
import { OpenSideBySideWindowButton } from "./OpenSideBySideWindowButton";

import "./styles.scss";

const sizes_inline_styles = {
  "--properties-panel-width": `${PROPERTIES_PANEL_WIDTH_PX}px`,
} as React.CSSProperties;

export function EditorContainer() {
  const { state, errorInfo, history } = useSyncUiWithBackend();

  let pageBody: React.ReactNode;

  if (errorInfo) {
    pageBody = (
      <DialogPopover className="message-mode">
        <h2>Error {errorInfo.context ? `while ${errorInfo.context}` : ``}</h2>
        <p className="error-msg">{errorInfo.msg}</p>
      </DialogPopover>
    );
  } else if (state.mode === "LOADING") {
    pageBody = (
      <DialogPopover className="message-mode">
        <h2>Loading initial state from server</h2>
      </DialogPopover>
    );
  } else if (state.mode === "MAIN") {
    pageBody = (
      <CurrentDraggedNodeProvider>
        <EditorSkeleton
          main={<UiNode node={state.uiTree} path={[]} />}
          left={<ElementsPalette />}
          properties={<SettingsPanel tree={state.uiTree} />}
          preview={<AppPreview />}
        />
      </CurrentDraggedNodeProvider>
    );
  } else {
    pageBody = <TemplateChooserView {...state.options} />;
  }

  return (
    <div className="EditorContainer" style={sizes_inline_styles}>
      <header>
        <SvgShinyLogo className="shiny-logo" />
        <h1 className="app-title">Shiny UI Editor</h1>
        <div className="right">
          {state.mode === "MAIN" ? (
            <>
              <OpenSideBySideWindowButton />
              <AppTour />
            </>
          ) : null}
          <div className="divider" />
          <UndoRedoButtons {...history} />
          <div className="spacer last" />
        </div>
      </header>
      {pageBody}
      <LostConnectionPopup />
    </div>
  );
}
