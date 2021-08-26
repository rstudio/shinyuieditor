import type { FunctionComponent } from "preact";
import { useEffect, useMemo, useRef } from "preact/hooks";
import { useRecoilValue } from "recoil";
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
        {Array.from({ length: rows.length - 1 }, (_, i) => (
          <GridItem
            key={i}
            startCol={1}
            endCol={-1}
            startRow={i + 1}
            className={classes.rowTractBoundary}
          />
        ))}
        {Array.from({ length: cols.length - 1 }, (_, i) => (
          <GridItem
            key={i}
            startRow={1}
            endRow={-1}
            startCol={i + 1}
            className={classes.colTractBoundary}
          />
        ))}
        <GridTractControls />
        {children}
        <GridCells numRows={rows.length} numCols={cols.length} />
      </GridContainer>
    </GridCard>
  );
};
