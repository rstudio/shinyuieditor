import type { FunctionComponent } from "preact";
import { useEffect, useMemo, useRef } from "preact/hooks";
import { useRecoilValue } from "recoil";
import { placeOnGridOrCol } from "../../helper-scripts/grid-helpers";
import { useGridDragger } from "../../state-logic/drag-logic";
import { gapState, gridTractsState } from "../../state-logic/recoilAtoms";
import { GridCard } from "../GridCard";
import { GridCells } from "../GridCells/GridCells";
import { GridContainer } from "../GridContainer";
import { GridItem } from "../GridItem";
import { GridTractControls } from "../GridTractControls";
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

  const tracts = useRecoilValue(gridTractsState);
  const gap = useRecoilValue(gapState);
  const { cols, rows } = tracts;
  const numRows = rows.length;
  const numCols = cols.length;
  // This feels very unneccesary but it helps avoid rerenders
  const containerStyles = useMemo(() => ({ "--gap": gap }), [gap]);

  return (
    <GridCard gridArea="editor" header={FakeBrowserBar} padding="0px">
      <GridContainer
        cols={cols}
        rows={rows}
        gap={gap}
        divRef={containerRef}
        styles={containerStyles}
      >
        <GridTractBoundaries numCols={numCols} numRows={numRows} />
        <GridTractControls />
        {children}
        <GridCells numRows={rows.length} numCols={cols.length} />
      </GridContainer>
    </GridCard>
  );
};

function GridTractBoundaries({
  numRows,
  numCols,
}: {
  numRows: number;
  numCols: number;
}) {
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
