import { useRecoilValue } from "recoil";
import { AddItemModal } from "../../components/AddItemModal";
import { EditableGridItems } from "../../components/EditableGridItems";
import { EditorGridContainer } from "../../components/EditorGridContainer";
import { EditorInstructions } from "../../components/EditorInstructions";
import { EditorItemsListView } from "../../components/EditorItemsListView";
import { EditorSettings, SettingPane } from "../../components/EditorSettings";
import { GapSizeSetting } from "../../components/GapSizeSetting";
import { DragFeedback } from "../../state-logic/drag-logic";
import {
  allRowsState,
  gapState,
  gridColsState,
  useInitiateLayoutState,
} from "../../state-logic/gridLayoutAtoms";
import type { GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export default function LayoutEditor({
  startingLayout,
}: {
  startingLayout: GridLayoutTemplate;
}) {
  useInitiateLayoutState(startingLayout);

  return (
    <div className={classes.editor}>
      <MainGridCSSVariables />
      <EditorSettings>
        <SettingPane label="Gap Size">
          <GapSizeSetting />
        </SettingPane>
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
  const gap = useRecoilValue(gapState);
  const rows = useRecoilValue(allRowsState);
  const cols = useRecoilValue(gridColsState);

  const styleBody = `
  body {
    --main-grid-columns: ${cols.join(" ")};
    --main-grid-rows: ${rows.join(" ")};
    --main-grid-gap: ${gap}; 
    --gap: ${gap};
  }
  `;

  return <style>{styleBody}</style>;
}
