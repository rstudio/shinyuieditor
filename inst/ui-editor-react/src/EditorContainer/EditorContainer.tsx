import React from "react";

import { useBackendCallbacks } from "backendCommunication/useBackendMessageCallbacks";
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
import { DialogPopover } from "./DialogPopover";

import "./styles.scss";

const sizes_inline_styles = {
  "--properties-panel-width": `${PROPERTIES_PANEL_WIDTH_PX}px`,
} as React.CSSProperties;

export function EditorContainer() {
  const backendCallbacks = useBackendCallbacks();
  const { status, tree, errorMsg } = useSyncUiWithBackend();

  backendCallbacks.sendMsg({ path: "READY-FOR-STATE" });
  backendCallbacks.backendMsgs.subscribe({
    on: "UPDATED-TREE",
    callback: (x) => console.log("New tree!", x),
  });

  let pageBody: React.ReactNode;

  if (errorMsg) {
    pageBody = (
      <DialogPopover className="message-mode">
        <h2>Error from server</h2>
        <p className="error-msg">{errorMsg}</p>
      </DialogPopover>
    );
  } else if (status === "loading" || tree === "LOADING_STATE") {
    pageBody = (
      <DialogPopover className="message-mode">
        <h2>Loading initial state from server</h2>
      </DialogPopover>
    );
  } else if (isShinyUiNode(tree)) {
    pageBody = (
      <CurrentDraggedNodeProvider>
        <EditorSkeleton
          main={<UiNode node={tree} path={[]} />}
          left={<ElementsPalette />}
          properties={<SettingsPanel tree={tree} />}
          preview={<AppPreview />}
        />
      </CurrentDraggedNodeProvider>
    );
  } else {
    pageBody = <TemplateChooserView />;
  }

  return (
    <div className="EditorContainer" style={sizes_inline_styles}>
      <AppHeader />
      {pageBody}
      <LostConnectionPopup />
    </div>
  );
}
