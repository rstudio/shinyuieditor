import * as React from "react";

import AppPreview from "components/AppPreview";
import UiNode from "components/UiNode/UiNode";
import { CurrentDraggedNodeProvider } from "DragAndDropHelpers/useCurrentDraggedNode";
import ElementsPalette from "ElementsPalette";
import PortalModal from "PortalModal";
import { useSelector } from "react-redux";
import type { RootState } from "state/store";

import { EditorSkeleton } from "./EditorSkeleton/EditorSkeleton";
import { SettingsPanel } from "./SettingsPanel/SettingsPanel";
import { useSyncUiWithBackend } from "./websocket_hooks/useSyncUiWithBackend";

export const PROPERTIES_PANEL_WIDTH_PX = 236;

export const sizes_inline_styles = {
  "--properties-panel-width": `${PROPERTIES_PANEL_WIDTH_PX}px`,
} as React.CSSProperties;

export function EditorContainer() {
  const { status, tree } = useSyncUiWithBackend();

  if (status === "loading") {
    return <LoadingMessage />;
  }

  return (
    <CurrentDraggedNodeProvider>
      <EditorSkeleton
        main={<UiNode node={tree} path={[]} />}
        left={<ElementsPalette />}
        properties={<SettingsPanel tree={tree} />}
        preview={<AppPreview />}
      />
    </CurrentDraggedNodeProvider>
  );
}

function LoadingMessage() {
  return <h3>Loading initial state from server</h3>;
}

export function LostConnectionPopup() {
  const connectedToServer = useSelector(
    (state: RootState) => state.connectedToServer
  );

  if (connectedToServer) return null;

  return (
    <PortalModal onConfirm={() => {}} onCancel={() => {}}>
      <p style={{ color: "var(--red, pink)", textAlign: "center" }}>
        Lost connection to backend. Check console where editor was launched for
        details.
      </p>
    </PortalModal>
  );
}
