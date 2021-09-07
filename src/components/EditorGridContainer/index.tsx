import type { FunctionComponent } from "preact";
import { useGridDragger } from "../../state-logic/dragging/hooks";
import { GridCard } from "../GridCard";
import { GridCells } from "../GridCells/GridCells";
import { GridTractControls } from "../GridTractControls";
import { RowAndColBoundaries } from "../RowAndColBoundaries";
import { FakeBrowserBar } from "../TheFakeBrowserBar";
import classes from "./style.module.css";

// A grid container that also displays a grid of all cells in background
export const EditorGridContainer: FunctionComponent = ({ children }) => {
  // Setup the new-item drag behavior
  const onMouseDown = useGridDragger({});

  return (
    <GridCard gridArea="editor" header={FakeBrowserBar} padding="0px">
      <div onMouseDown={onMouseDown} className={classes.mainGridContainer}>
        <RowAndColBoundaries />
        <GridTractControls />
        {children}
        <GridCells />
      </div>
    </GridCard>
  );
};
