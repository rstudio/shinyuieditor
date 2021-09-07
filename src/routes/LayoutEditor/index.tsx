import { AddItemModal } from "../../components/AddItemModal";
import { DragFeedback } from "../../components/DragFeedback";
import { EditableGridItems } from "../../components/EditableGridItems";
import { EditorGridContainer } from "../../components/EditorGridContainer";
import { EditorInstructions } from "../../components/EditorInstructions";
import { EditorItemsListView } from "../../components/EditorItemsListView";
import { EditorSettings, SettingPane } from "../../components/EditorSettings";
import { GapSizeSetting } from "../../components/GapSizeSetting";
import { MainGridCSSVariables } from "../../components/MainGridCSSVariables";
import {
  gridItemsState,
  itemNamesState,
} from "../../state-logic/gridItems/atoms";
import { useDeleteItem } from "../../state-logic/gridItems/hooks";
import { gapState } from "../../state-logic/gridLayout/atoms";
import classes from "./style.module.css";

export default function LayoutEditor() {
  const deleteItem = useDeleteItem();

  return (
    <div className={classes.editor}>
      <MainGridCSSVariables />
      <EditorSettings>
        <SettingPane label="Gap Size">
          <GapSizeSetting gapAtom={gapState} />
        </SettingPane>
      </EditorSettings>
      <EditorInstructions />
      <EditorItemsListView
        itemNamesAtom={itemNamesState}
        deleteItem={deleteItem}
      />
      <EditorGridContainer gridItemsFamily={gridItemsState} />
      <AddItemModal />
    </div>
  );
}
