import { AddItemModal } from "../../components/AddItemModal";
import { EditorGridContainer } from "../../components/EditorGridContainer";
import { EditorInstructions } from "../../components/EditorInstructions";
import { EditorItemsListView } from "../../components/EditorItemsListView";
import { EditorSettings, SettingPane } from "../../components/EditorSettings";
import { GapSizeSetting } from "../../components/GapSizeSetting";
import { MainGridCSSVariables } from "../../components/MainGridCSSVariables";
import { gridItemNames, useDeleteItem } from "../../state-logic/gridItems";
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
        itemNamesAtom={gridItemNames}
        deleteItem={deleteItem}
      />
      <EditorGridContainer />
      <AddItemModal />
    </div>
  );
}
