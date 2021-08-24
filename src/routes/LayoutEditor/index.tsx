import { useEffect, useRef } from "preact/hooks";
import { useSetRecoilState } from "recoil";
import { AddItemModal } from "../../components/AddItemModal";
import { EditableGridItems } from "../../components/EditableGridItems";
import { EditorGridContainer } from "../../components/EditorGridContainer";
import { EditorInstructions } from "../../components/EditorInstructions";
import { EditorItemsListView } from "../../components/EditorItemsListView";
import { EditorSettings } from "../../components/EditorSettings";
import { GapSizeSetting } from "../../components/GapSizeSetting";
import { DragFeedback, useDragHandler } from "../../state-logic/drag-logic";
import { useAddNewItem } from "../../state-logic/gridItems";
import {
  gapState,
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
  const addNewItem = useAddNewItem();
  const setTracts = useSetRecoilState(gridTractsState);

  // Load initial state just once at the first render of component
  useEffect(() => {
    startingLayout.items.forEach((itemDef) => addNewItem(itemDef));
    setTracts(startingLayout);
    setGapSize(startingLayout.gap);
  }, []);

  // We need a reference to the main parent element of everything so we can
  // attach event handlers for drag detection to it.
  const editorRef = useRef<HTMLDivElement>(null);

  // Initiate the drag watching behavior
  const { startDrag } = useDragHandler({
    watchingRef: editorRef,
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
        <DragFeedback />
      </EditorGridContainer>
      <AddItemModal />
    </div>
  );
}
