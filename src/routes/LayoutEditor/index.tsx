import { useReducer, useRef } from "preact/hooks";
import { CssUnitInput } from "../../components/CssUnitInput";
import { DragFeedbackRect } from "../../components/DragFeedbackRect";
import { EditableGridItems } from "../../components/EditableGridItems";
import { EditorGridContainer } from "../../components/EditorGridContainer";
import { EditorInstructions } from "../../components/EditorInstructions";
import { EditorItemsListView } from "../../components/EditorItemsListView";
import { EditorSettings, SettingPane } from "../../components/EditorSettings";
import { GridCells } from "../../components/GridCells/GridCells";
import { GridTractControls } from "../../components/GridTractControls";
import { dragUpdater, useDragHandler } from "../../state-logic/drag-logic";
import { layoutUpdater } from "../../state-logic/layout-updating-logic";
import type { GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export default function LayoutEditor({
  startingLayout,
}: {
  startingLayout: GridLayoutTemplate;
}) {
  const [layout, updateLayout] = useReducer(layoutUpdater, startingLayout);

  const [dragState, updateDragState] = useReducer(dragUpdater, null);

  // We need a reference to the main parent element of everything so we can
  // attach event handlers for drag detection to it.
  const editorRef = useRef<HTMLDivElement>(null);

  useDragHandler({ updateDragState, watchingRef: editorRef });

  const { rows, cols, items, gap } = layout;

  return (
    <div className={classes.editor} ref={editorRef}>
      <EditorSettings>
        <SettingPane label={"Gap Size"}>
          <CssUnitInput
            value={gap}
            onChange={(gap) => updateLayout({ type: "Set-Gap", gap })}
          />
        </SettingPane>
      </EditorSettings>
      <EditorInstructions />
      <EditorItemsListView
        items={items}
        deleteItem={(name) => updateLayout({ type: "Delete-Item", name })}
      />
      <EditorGridContainer layout={layout}>
        <GridTractControls
          rows={rows}
          cols={cols}
          setTract={(tract) => updateLayout({ type: "Set-Tract", tract })}
        />
        <EditableGridItems items={items} editorRef={editorRef} />
        <DragFeedbackRect status={dragState} />
        <GridCells rows={rows} cols={cols} />
      </EditorGridContainer>
    </div>
  );
}
