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
  gridColsState,
  gridRowsState,
} from "../../state-logic/recoilAtoms";
import type { CSSMeasure, GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export default function LayoutEditor({
  startingLayout,
}: {
  startingLayout: GridLayoutTemplate;
}) {
  const setGapSize = useSetRecoilState(gapState);
  const addNewItem = useAddNewItem();
  const setRows = useSetRecoilState(gridRowsState);
  const setCols = useSetRecoilState(gridColsState);

  // Load initial state just once at the first render of component
  useEffect(() => {
    startingLayout.items.forEach((itemDef) => addNewItem(itemDef));
    setRows(startingLayout.rows as CSSMeasure[]);
    setCols(startingLayout.cols as CSSMeasure[]);
    setGapSize(startingLayout.gap);
  }, []);

  return (
    <div className={classes.editor}>
      <MainGridCSSVariables />
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

function MainGridCSSVariables() {
  return (
    <style>
      body{"{"}
      --specialCustomColor: tomato;
      {"}"}
    </style>
  );
}
