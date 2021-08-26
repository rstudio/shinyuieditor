import { useEffect } from "preact/hooks";
import { useSetRecoilState } from "recoil";
import { AddItemModal } from "../../components/AddItemModal";
import { EditableGridItems } from "../../components/EditableGridItems";
import { EditorGridContainer } from "../../components/EditorGridContainer";
import { EditorInstructions } from "../../components/EditorInstructions";
import { EditorItemsListView } from "../../components/EditorItemsListView";
import { EditorSettings } from "../../components/EditorSettings";
import { GapSizeSetting } from "../../components/GapSizeSetting";
import { DragFeedback } from "../../state-logic/drag-logic";
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

  return (
    <div className={classes.editor}>
      <EditorSettings>
        <GapSizeSetting />
      </EditorSettings>
      <EditorInstructions />
      <EditorItemsListView />
      <EditorGridContainer>
        <EditableGridItems />
        <DragFeedback />
      </EditorGridContainer>
      <AddItemModal />
    </div>
  );
}
