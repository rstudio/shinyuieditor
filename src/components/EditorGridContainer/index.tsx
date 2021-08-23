import type { FunctionComponent } from "preact";
import { useEffect, useMemo, useRef } from "preact/hooks";
import { DragKickoffFn } from "../../state-logic/drag-logic";
import { GridLayoutTemplate } from "../../types";
import { GridCard } from "../GridCard";
import { GridCells } from "../GridCells/GridCells";
import { GridContainer } from "../GridContainer";
import { GridItem } from "../GridItem";
import { FakeBrowserBar } from "../TheFakeBrowserBar";
import classes from "./style.module.css";

// A grid container that also displays a grid of all cells in background
export const EditorGridContainer: FunctionComponent<{
  layout: GridLayoutTemplate;
  onDrag: DragKickoffFn;
}> = ({ layout, children, onDrag }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current as HTMLDivElement;

    const triggerDrag = (e: MouseEvent) => {
      onDrag(e, {
        dragType: "NewItemDrag",
        dragDir: "bottomRight",
      });
    };

    container.addEventListener("mousedown", triggerDrag);
    () => {
      container.removeEventListener("mousedown", triggerDrag);
    };
  }, []);
  const { cols = [], rows = [], gap } = layout;

  // We need to make one less tract line that there are tracts because the
  // controls only go between and there are N-1 spots between N elements
  const rowTractLines = useMemo(
    () =>
      Array.from({ length: rows.length - 1 }, (_, i) => (
        <GridItem
          startCol={1}
          endCol={-1}
          startRow={i + 1}
          className={classes.rowTractBoundary}
        />
      )),
    [rows.length]
  );

  const colTractLines = useMemo(
    () =>
      Array.from({ length: cols.length - 1 }, (_, i) => (
        <GridItem
          startRow={1}
          endRow={-1}
          startCol={i + 1}
          className={classes.colTractBoundary}
        />
      )),
    [cols.length]
  );

  // This feels very unneccesary but it helps avoid rerenders
  const containerStyles = useMemo(() => ({ "--gap": gap }), [gap]);

  return (
    <GridCard gridArea="editor" header={FakeBrowserBar} padding="0px">
      <GridContainer {...layout} divRef={containerRef} styles={containerStyles}>
        {rowTractLines}
        {colTractLines}
        {children}
        <GridCells rows={rows} cols={cols} />
      </GridContainer>
    </GridCard>
  );
};
