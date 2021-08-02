import { FunctionComponent, JSX, RefObject } from "preact";
import { useReducer } from "preact/hooks";
import { DragDispatch, dragUpdater } from "../../state-logic/drag-logic";
import { GridLayoutTemplate } from "../../types";
import { TheDragFeedbackRect } from "../TheDragFeedbackRect";
import { EditableGridItem } from "../EditableGridItem";
import { TheFakeBrowserBar } from "../TheFakeBrowserBar";
import { GridCard } from "../GridCard";
import { GridContainer } from "../GridContainer";
import { GridItem } from "../GridItem";
import { GridTractControl } from "../GridTractControl";
import classes from "./style.module.css";

// A grid container that also displays a grid of all cells in background
export const TheAppGridContainer: FunctionComponent<{
  layout: GridLayoutTemplate;
  styles?: JSX.CSSProperties;
  editorRef: RefObject<HTMLDivElement>;
}> = ({ layout, styles: extraStyles, editorRef }) => {
  const [dragState, updateDragState] = useReducer(dragUpdater, null);

  const { cols = [], rows = [], gap, items } = layout;

  // We need to make one less tract line that there are tracts because the
  // controls only go between and there are N-1 spots between N elements
  const rowTractLines = Array.from({ length: rows.length - 1 }, (_, i) => (
    <GridItem
      cols={[1, -1]}
      rows={[i + 1, i + 1]}
      className={classes.rowTractBoundary}
    />
  ));
  const colTractLines = Array.from({ length: cols.length - 1 }, (_, i) => (
    <GridItem
      rows={[1, -1]}
      cols={[i + 1, i + 1]}
      className={classes.colTractBoundary}
    />
  ));

  const gridItems = items.map(({ name, rows, cols }) => (
    <EditableGridItem
      name={name}
      rows={rows}
      cols={cols}
      editorRef={editorRef}
    />
  ));

  const rowControls = rows.map((r, i) => (
    <GridTractControl val={r} index={i} dir={"rows"} />
  ));

  const colControls = cols.map((c, i) => (
    <GridTractControl val={c} index={i} dir={"cols"} />
  ));

  return (
    <GridCard gridArea="editor" header={<TheFakeBrowserBar />} padding={"0px"}>
      <DragDispatch.Provider value={updateDragState}>
        <GridContainer defs={layout} styles={{ ...extraStyles, "--gap": gap }}>
          {gridItems}
          {rowTractLines}
          {colTractLines}
          {rowControls}
          {colControls}
          <TheDragFeedbackRect status={dragState} />
        </GridContainer>
      </DragDispatch.Provider>
    </GridCard>
  );
};
