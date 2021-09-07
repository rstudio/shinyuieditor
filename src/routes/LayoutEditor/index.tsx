import { AddItemModal } from "../../components/AddItemModal";
import { EditableGridItems } from "../../components/EditableGridItems";
import { EditorGridContainer } from "../../components/EditorGridContainer";
import { EditorInstructions } from "../../components/EditorInstructions";
import { EditorItemsListView } from "../../components/EditorItemsListView";
import { EditorSettings, SettingPane } from "../../components/EditorSettings";
import { GapSizeSetting } from "../../components/GapSizeSetting";
import { MainGridCSSVariables } from "../../components/MainGridCSSVariables";
import { DragFeedback } from "../../components/DragFeedback";
import classes from "./style.module.css";
import { itemNamesState } from "../../state-logic/gridItems/atoms";

export default function LayoutEditor() {
  return (
    <div className={classes.editor}>
      <MainGridCSSVariables />
      <EditorSettings>
        <SettingPane label="Gap Size">
          <GapSizeSetting />
        </SettingPane>
      </EditorSettings>
      <EditorInstructions />
      <EditorItemsListView itemNamesAtom={itemNamesState} />
      <EditorGridContainer>
        <EditableGridItems />
        <DragFeedback />
      </EditorGridContainer>
      <AddItemModal />
    </div>
  );
}
