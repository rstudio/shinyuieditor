import { useCallback, useMemo, useReducer, useRef } from "preact/hooks";
import { AddItemModal, useAddItemModal } from "../../components/AddItemModal";
import { CssUnitInput } from "../../components/CssUnitInput";
import { EditableGridItems } from "../../components/EditableGridItems";
import { EditorGridContainer } from "../../components/EditorGridContainer";
import { EditorInstructions } from "../../components/EditorInstructions";
import { EditorItemsListView } from "../../components/EditorItemsListView";
import { EditorSettings, SettingPane } from "../../components/EditorSettings";
import { GridTractControls } from "../../components/GridTractControls";
import { DragFeedback, useDragHandler } from "../../state-logic/drag-logic";
import { layoutUpdater } from "../../state-logic/layout-updating-logic";
import type { CSSMeasure, GridLayoutTemplate } from "../../types";
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
  const [layout, layoutDispatch] = useReducer(layoutUpdater, startingLayout);
  // We are using useCallback here around our helper functions so
  // they are referentially stable when we pass them to components. This
  // helps us avoid implementaiton leaks that would be neccesary if we passed
  // in the dispatch to the thing itself.
  const setGap = useCallback(
    (gap: CSSMeasure) => layoutDispatch({ type: "Set-Gap", gap }),
    [layoutDispatch]
  );

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
    layoutDispatch,
  });

  const { items } = layout;
  const gap = useMemo(() => layout.gap, [layout.gap]);
  const rows = useMemo(() => layout.rows, [layout.rows]);
  const cols = useMemo(() => layout.cols, [layout.cols]);

  return (
    <div className={classes.editor} ref={editorRef}>
      <EditorSettings>
        <SettingPane label="Gap Size">
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
          layoutDispatch={layoutDispatch}
          closeModal={closeAddItemModal}
        />
      ) : null}
    </div>
  );
}
