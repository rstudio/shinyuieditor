import React from "react";

import AppPreview from "components/AppPreview";
import { TemplateChooserView } from "components/TemplatePreviews/TemplateChooserView";
import UiNode from "components/UiNode/UiNode";
import { CurrentDraggedNodeProvider } from "DragAndDropHelpers/useCurrentDraggedNode";
import { LostConnectionPopup } from "EditorSkeleton/LostConnectionPopup";
import ElementsPalette from "ElementsPalette";
import { isShinyUiNode } from "Shiny-Ui-Elements/isShinyUiNode";

import {
  EditorSkeleton,
  PROPERTIES_PANEL_WIDTH_PX,
} from "../EditorSkeleton/EditorSkeleton";
import { SettingsPanel } from "../SettingsPanel/SettingsPanel";
import { useSyncUiWithBackend } from "../websocket_hooks/useSyncUiWithBackend";

import { AppHeader } from "./AppHeader";
import "./styles.scss";

const sizes_inline_styles = {
  "--properties-panel-width": `${PROPERTIES_PANEL_WIDTH_PX}px`,
} as React.CSSProperties;

export function EditorContainer() {
  const { status, tree } = useSyncUiWithBackend();

  if (status === "loading") {
    return <h3>Loading initial state from server</h3>;
  }

  return (
    <div className="EditorContainer" style={sizes_inline_styles}>
      <AppHeader />
      {isShinyUiNode(tree) ? (
        <CurrentDraggedNodeProvider>
          <EditorSkeleton
            main={<UiNode node={tree} path={[]} />}
            left={<ElementsPalette />}
            properties={<SettingsPanel tree={tree} />}
            preview={<AppPreview />}
          />
        </CurrentDraggedNodeProvider>
      ) : (
        <TemplateChooserView />
      )}
      <LostConnectionPopup />
    </div>
  );
}
