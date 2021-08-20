import { useRef } from "preact/hooks";
import { AddItemModal, useAddItemModal } from "../../components/AddItemModal";
import { CssUnitInput } from "../../components/CssUnitInput";
import { EditableGridItems } from "../../components/EditableGridItems";
import { EditorGridContainer } from "../../components/EditorGridContainer";
import { EditorInstructions } from "../../components/EditorInstructions";
import { EditorItemsListView } from "../../components/EditorItemsListView";
import { EditorSettings, SettingPane } from "../../components/EditorSettings";
import { GridTractControls } from "../../components/GridTractControls";
import { DragFeedback, useDragHandler } from "../../state-logic/drag-logic";
import { useGridLayoutState } from "../../state-logic/layout-updating-logic";
import type { GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export default function LayoutEditor({
  startingLayout,
}: {
  startingLayout: GridLayoutTemplate;
}) {
  // We need a reference to the main parent element of everything so we can
  // attach event handlers for drag detection to it.
  const editorRef = useRef<HTMLDivElement>(null);

  // Setup hooks that control app state

  // Initialize the layout state and get out the various manipulation functions
  // that go with it
  const {
    layout,
    layoutDispatch,
    setGap,
    addItem,
    moveItem,
  } = useGridLayoutState(startingLayout);

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
    onReposition: moveItem,
  });

  const { rows, cols, items, gap } = layout;

  return (
    <div className={classes.editor} ref={editorRef}>
      <EditorSettings>
        <SettingPane label={"Gap Size"}>
          <CssUnitInput value={gap} onChange={setGap} />
        </SettingPane>
      </EditorSettings>
      {EditorInstructions}
      <EditorItemsListView items={items} layoutDispatch={layoutDispatch} />
      <EditorGridContainer layout={layout} onDrag={startDrag}>
        <GridTractControls
          rows={rows}
          cols={cols}
          layoutDispatch={layoutDispatch}
        />
        <EditableGridItems items={items} onDrag={startDrag} />
        <DragFeedback dragState={dragState} />
      </EditorGridContainer>
      {addItemState ? (
        <AddItemModal
          state={addItemState}
          existingElementNames={items.map((item) => item.name)}
          onFinish={addItem}
          closeModal={closeAddItemModal}
        />
      ) : null}
    </div>
  );
}
