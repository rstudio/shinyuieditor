import type { FunctionComponent } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { useRecoilValue } from "recoil";
import { placeOnGridOrCol } from "../../helper-scripts/grid-helpers";
import { useGridDragger } from "../../state-logic/drag-logic";
import { gridColsState, gridRowsState } from "../../state-logic/recoilAtoms";
import { GridCard } from "../GridCard";
import { GridCells } from "../GridCells/GridCells";
import { GridItem } from "../GridItem";
import { GridColsControls, GridRowsControls } from "../GridTractControls";
import { FakeBrowserBar } from "../TheFakeBrowserBar";
import classes from "./style.module.css";

// A grid container that also displays a grid of all cells in background
export const EditorGridContainer: FunctionComponent = ({ children }) => {
  // Setup the new-item drag behavior
  const onMouseDown = useGridDragger({});
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    containerRef.current?.addEventListener("mousedown", onMouseDown);
    () => {
      containerRef.current?.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return (
    <GridCard gridArea="editor" header={FakeBrowserBar} padding="0px">
      <div ref={containerRef} className={classes.mainGridContainer}>
        <GridTractBoundaries />
        <GridRowsControls />
        <GridColsControls />
        {children}
        <GridCells />
      </div>
    </GridCard>
  );
};

function GridTractBoundaries() {
  const numRows = useRecoilValue(gridRowsState).length;
  const numCols = useRecoilValue(gridColsState).length;

  return (
    <>
      {Array.from({ length: numRows - 1 }, (_, index) => (
        <GridItem
          {...placeOnGridOrCol({ index, dir: "rows" })}
          className={classes.rowTractBoundary}
        />
      ))}
      {Array.from({ length: numCols - 1 }, (_, index) => (
        <GridItem
          {...placeOnGridOrCol({ index, dir: "cols" })}
          className={classes.colTractBoundary}
        />
      ))}
    </>
  );
}
