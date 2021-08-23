import { useRef } from "preact/hooks";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AddItemModal, useAddItemModal } from "../../components/AddItemModal";
import { CssUnitInput } from "../../components/CssUnitInput";
import { EditableGridItems } from "../../components/EditableGridItems";
import { EditorGridContainer } from "../../components/EditorGridContainer";
import { EditorInstructions } from "../../components/EditorInstructions";
import { EditorItemsListView } from "../../components/EditorItemsListView";
import { EditorSettings, SettingPane } from "../../components/EditorSettings";
import { DragFeedback, useDragHandler } from "../../state-logic/drag-logic";
import {
  gapState,
  gridItemsState,
  gridTractsState,
} from "../../state-logic/layout-updating-logic";
import type { GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export default function LayoutEditor({
  startingLayout,
}: {
  startingLayout: GridLayoutTemplate;
}) {
  const setGapSize = useSetRecoilState(gapState);
  setGapSize(startingLayout.gap);

  const setItems = useSetRecoilState(gridItemsState);
  setItems(startingLayout.items);

  const setTracts = useSetRecoilState(gridTractsState);
  setTracts(startingLayout);

  // We need a reference to the main parent element of everything so we can
  // attach event handlers for drag detection to it.
  const editorRef = useRef<HTMLDivElement>(null);

  // Setup hooks that control app state

  // Setup the neccesary state for controlling the add-item modal
  const {
    addItemState,
    openAddItemModal,
    closeAddItemModal,
  } = useAddItemModal();

  // Initiate the drag watching behavior
  const { dragState, startDrag } = useDragHandler({
    watchingRef: editorRef,
    onNewItem: openAddItemModal,
  });

  return (
    <div className={classes.editor} ref={editorRef}>
      <EditorSettings>
        <GapSizeSetting />
      </EditorSettings>
      {EditorInstructions}
      <EditorItemsListView />
      <EditorGridContainer onDrag={startDrag}>
        <EditableGridItems onDrag={startDrag} />
        <DragFeedback dragState={dragState} />
      </EditorGridContainer>
      {addItemState ? (
        <AddItemModal state={addItemState} closeModal={closeAddItemModal} />
      ) : null}
    </div>
  );
}

function GapSizeSetting() {
  const [gap, setGap] = useRecoilState(gapState);
  return (
    <SettingPane label="Gap Size">
      <CssUnitInput value={gap} onChange={setGap} />
    </SettingPane>
  );
}
