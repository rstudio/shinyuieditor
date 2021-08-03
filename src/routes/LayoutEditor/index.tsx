import { useReducer, useRef } from "preact/hooks";
import { CssUnitInput } from "../../components/CssUnitInput";
import { DragFeedbackRect } from "../../components/DragFeedbackRect";
import { EditableGridItems } from "../../components/EditableGridItems";
import { GridTractControls } from "../../components/GridTractControls";
import { TheAppGridContainer } from "../../components/TheAppGridContainer";
import { TheInstructions } from "../../components/TheInstructions";
import { TheItemsListView } from "../../components/TheItemsListView";
import {
  SettingPane,
  TheSettingsPanel,
} from "../../components/TheSettingsPanel";
import { dragUpdater } from "../../state-logic/drag-logic";
import { layoutUpdater } from "../../state-logic/layout-updating-logic";
import type { GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export default function LayoutEditor(props: {
  startingLayout: GridLayoutTemplate;
}) {
  const [layout, updateLayout] = useReducer(
    layoutUpdater,
    props.startingLayout
  );

  const [dragState, updateDragState] = useReducer(dragUpdater, null);

  // We need a reference to the main parent element of everything so we can
  // attach event handlers for drag detection to it.
  const editorRef = useRef<HTMLDivElement>(null);

  const { rows, cols, items, gap } = layout;

  return (
    <div className={classes.editor} ref={editorRef}>
      <TheSettingsPanel>
        <SettingPane label={"Gap Size"}>
          <CssUnitInput
            value={gap}
            onChange={(gap) => updateLayout({ type: "Set-Gap", gap })}
          />
        </SettingPane>
      </TheSettingsPanel>
      <TheInstructions />
      <TheItemsListView
        items={items}
        deleteItem={(name) => updateLayout({ type: "Delete-Item", name })}
      />
      <TheAppGridContainer layout={layout}>
        <GridTractControls
          rows={rows}
          cols={cols}
          setTract={(tract) => updateLayout({ type: "Set-Tract", tract })}
        />
        <EditableGridItems
          items={items}
          editorRef={editorRef}
          dragDispatch={updateDragState}
        />
        <DragFeedbackRect status={dragState} />
      </TheAppGridContainer>
    </div>
  );
}
