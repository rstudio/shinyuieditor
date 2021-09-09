import { atom, useRecoilValue } from "recoil";
import { AddItemModal } from "../../components/AddItemModal";
import { EditorGridContainer } from "../../components/EditorGridContainer";
import { EditorInstructions } from "../../components/EditorInstructions";
import { EditorItemsListView } from "../../components/EditorItemsListView";
import { EditorSettings, SettingPane } from "../../components/EditorSettings";
import { GapSizeSetting } from "../../components/GapSizeSetting";
import { MainGridCSSVariables } from "../../components/MainGridCSSVariables";
import { gridItemNames } from "../../state-logic/gridItems/atoms";
import { useDeleteItem } from "../../state-logic/gridItems/hooks";
import { gapState } from "../../state-logic/gridLayout/atoms";
import classes from "./style.module.css";

export const selectedItemNameState = atom<string | null>({
  key: "selectedItemName",
  default: null,
});

function CurrentlySelectedItem() {
  const selectedItemName = useRecoilValue(selectedItemNameState);

  return (
    <SettingPane label="Selected Item">
      <span>{selectedItemName ? selectedItemName : "Nothing selected"}</span>
    </SettingPane>
  );
}

export default function LayoutEditor() {
  const deleteItem = useDeleteItem();

  return (
    <div className={classes.editor}>
      <MainGridCSSVariables />
      <EditorSettings>
        <SettingPane label="Gap Size">
          <GapSizeSetting gapAtom={gapState} />
        </SettingPane>
        <CurrentlySelectedItem />
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
