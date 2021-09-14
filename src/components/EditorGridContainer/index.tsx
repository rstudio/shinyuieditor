import { gridItemAtoms, gridItemNames } from "../../state-logic/gridItems";
import {
  gridColsAtomFamily,
  gridRowsAtomFamily,
  tractDimsState,
} from "../../state-logic/gridLayout/atoms";
import { useGridDragger } from "../../state-logic/itemDragging";
import { DragFeedback } from "../DragFeedbackRect";
import { EditableGridItems } from "../EditableGridItems";
import { GridCard } from "../GridCard";
import { GridTractControls } from "../GridTractControls";
import { SelectedItemOverlay } from "../SelectedItemOverlay";
import { FakeBrowserBar } from "../TheFakeBrowserBar";
import classes from "./style.module.css";

// A grid container that also displays a grid of all cells in background
export function EditorGridContainer() {
  // Setup the new-item drag behavior
  const onMouseDown = useGridDragger();

  return (
    <GridCard gridArea="editor" header={FakeBrowserBar} padding="0px">
      <div className={classes.mainGridContainer}>
        <div
          onMouseDown={onMouseDown}
          className={classes.newItemDragDetector}
        />
        <GridTractControls
          tractDimsState={tractDimsState}
          rowsAtomFamily={gridRowsAtomFamily}
          colsAtomFamily={gridColsAtomFamily}
        />
        <EditableGridItems
          itemNamesState={gridItemNames}
          itemDefsState={gridItemAtoms}
        />
        <SelectedItemOverlay />
        <DragFeedback />
      </div>
    </GridCard>
  );
}
