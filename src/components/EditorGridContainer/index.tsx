import { useGridDragger } from "../../state-logic/dragging/hooks";
import {
  gridItemNames,
  GridItemsAtomFamily,
  gridItemsState,
} from "../../state-logic/gridItems/atoms";
import {
  gridColsAtomFamily,
  gridRowsAtomFamily,
  tractDimsState,
} from "../../state-logic/gridLayout/atoms";
import { DragFeedback } from "../DragFeedback";
import { EditableGridItems } from "../EditableGridItems";
import { GridCard } from "../GridCard";
import { GridTractControls } from "../GridTractControls";
import { FakeBrowserBar } from "../TheFakeBrowserBar";
import classes from "./style.module.css";

// A grid container that also displays a grid of all cells in background
export function EditorGridContainer({
  gridItemsFamily,
}: {
  gridItemsFamily: GridItemsAtomFamily;
}) {
  // Setup the new-item drag behavior
  const onMouseDown = useGridDragger({});

  return (
    <GridCard gridArea="editor" header={FakeBrowserBar} padding="0px">
      <div onMouseDown={onMouseDown} className={classes.mainGridContainer}>
        <GridTractControls
          tractDimsState={tractDimsState}
          rowsAtomFamily={gridRowsAtomFamily}
          colsAtomFamily={gridColsAtomFamily}
        />
        <EditableGridItems
          itemNamesState={gridItemNames}
          itemDefsState={gridItemsState}
        />
        <DragFeedback />
      </div>
    </GridCard>
  );
}
