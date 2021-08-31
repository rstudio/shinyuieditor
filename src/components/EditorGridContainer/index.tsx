import type { FunctionComponent } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { useGridDragger } from "../../state-logic/drag-logic";
import { GridCard } from "../GridCard";
import { GridCells } from "../GridCells/GridCells";
import { GridTractControls } from "../GridTractControls";
import { FakeBrowserBar } from "../TheFakeBrowserBar";
import { RowAndColBoundaries } from "../RowAndColBoundaries";
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
        <RowAndColBoundaries />
        <GridTractControls />
        {children}
        <GridCells />
      </div>
    </GridCard>
  );
};
