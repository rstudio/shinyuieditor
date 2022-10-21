import AppPreview from "components/AppPreview";
import { TemplatePreviewGrid } from "components/TemplatePreviews/TemplatePreviewGrid";
import UiNode from "components/UiNode/UiNode";
import { CurrentDraggedNodeProvider } from "DragAndDropHelpers/useCurrentDraggedNode";
import ElementsPalette from "ElementsPalette";
import { isShinyUiNode } from "Shiny-Ui-Elements/isShinyUiNode";

import { EditorSkeleton } from "./EditorSkeleton/EditorSkeleton";
import { SettingsPanel } from "./SettingsPanel/SettingsPanel";
import { useSyncUiWithBackend } from "./websocket_hooks/useSyncUiWithBackend";

export function EditorContainer() {
  const { status, tree, setTree } = useSyncUiWithBackend();

  if (status === "loading") {
    return <h3>Loading initial state from server</h3>;
  }

  if (isShinyUiNode(tree)) {
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

  return (
    <CurrentDraggedNodeProvider>
      <EditorSkeleton
        main={<TemplatePreviewGrid setTemplate={setTree} />}
        left={<ElementsPalette />}
      />
    </CurrentDraggedNodeProvider>
  );
}
