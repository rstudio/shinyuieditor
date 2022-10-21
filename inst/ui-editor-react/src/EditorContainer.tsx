import * as React from "react";

import AppPreview from "components/AppPreview";
import UiNode from "components/UiNode/UiNode";
import { CurrentDraggedNodeProvider } from "DragAndDropHelpers/useCurrentDraggedNode";
import ElementsPalette from "ElementsPalette";

import { EditorSkeleton } from "./EditorSkeleton/EditorSkeleton";
import { SettingsPanel } from "./SettingsPanel/SettingsPanel";
import { useSyncUiWithBackend } from "./websocket_hooks/useSyncUiWithBackend";

export function EditorContainer() {
  const { status, tree } = useSyncUiWithBackend();

  if (status === "loading") {
    return <h3>Loading initial state from server</h3>;
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
