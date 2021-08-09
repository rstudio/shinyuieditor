import { useRef } from "preact/hooks";
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
  const { layout, deleteItem, setTract, setGap } = useGridLayoutState(
    startingLayout
  );
  // We need a reference to the main parent element of everything so we can
  // attach event handlers for drag detection to it.
  const editorRef = useRef<HTMLDivElement>(null);

  const { dragState, startDrag } = useDragHandler(editorRef);

  const { rows, cols, items, gap } = layout;

  return (
    <div className={classes.editor} ref={editorRef}>
      <EditorSettings>
        <SettingPane label={"Gap Size"}>
          <CssUnitInput value={gap} onChange={setGap} />
        </SettingPane>
      </EditorSettings>
      <EditorInstructions />
      <EditorItemsListView items={items} deleteItem={deleteItem} />
      <EditorGridContainer layout={layout} onDrag={startDrag}>
        <GridTractControls rows={rows} cols={cols} setTract={setTract} />
        <EditableGridItems items={items} onDrag={startDrag} />
        <DragFeedback dragState={dragState} />
      </EditorGridContainer>
    </div>
  );
}
