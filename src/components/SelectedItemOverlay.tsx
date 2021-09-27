/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import { IconType } from "react-icons";
import {
  BsArrowDown,
  BsArrowDownLeft,
  BsArrowDownRight,
  BsArrowLeft,
  BsArrowRight,
  BsArrowUp,
  BsArrowUpLeft,
  BsArrowUpRight,
} from "react-icons/bs";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { enumerateGridDims } from "../grid-helpers";
import { DragDir } from "../GridTypes";
import {
  selectedItemNameState,
  selectedItemState,
} from "../state-logic/gridItems";
import { tractDims } from "../state-logic/gridLayout/atoms";
import { dragStateAtom, useGridDragger } from "../state-logic/itemDragging";
import { GridItemDiv } from "./GridItemDiv";

export function SelectedItemOverlay() {
  const resetSelection = useResetRecoilState(selectedItemNameState);
  const selectedItem = useRecoilValue(selectedItemState);
  const itemRef = React.useRef<HTMLDivElement>(null);
  const startDrag = useGridDragger(itemRef);
  if (selectedItem === null) return null;

  // The reason that we have a separate div for triggering the resetting of the
  // selected item is because if the click event was listening on the main div
  // it's really hard to differentiate between the drag events and the click to
  // close events, whereas the mouse-down on a drag handle wont trigger a click
  // event on the cancelBox div behind it.
  return (
    <>
      <GridItemDiv ref={itemRef} css={overlayStyles} {...selectedItem}>
        {dirToDragger.map(({ dir, DragIcon, styles }) => (
          <span
            key={dir}
            css={{
              color: "var(--light-grey, blue)",
              placeSelf: "center",
              padding: "4px",
              zIndex: 1000, //High z index so the draggers sit above the cancel listener div
              ...styles,
            }}
            onMouseDown={(e) => {
              startDrag(e, dir);
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <DragIcon size="1.3rem" />
          </span>
        ))}
        <div
          css={cancelBoxStyles}
          onClick={() => {
            resetSelection();
          }}
        />
      </GridItemDiv>
      <DragFeedback />
      <GridCellsMemo />
    </>
  );
}

const overlayStyles = css({
  backgroundColor: "var(--color, rgba(34, 139, 34, 0.835))",
  borderRadius: "var(--corner-radius)",
  display: "grid",
  gridTemplateAreas: `
    "topLeft    top      topRight"
    "left       middle   right"
    "bottomLeft bottom   bottomRight"`,
  gridTemplateColumns: "auto 1fr auto",
  gridTemplateRows: "auto 1fr auto",
  position: "relative",
  boxShadow: "var(--selected-shadow)",
});

const cancelBoxStyles = css({
  position: "absolute",
  width: "100%",
  height: "100%",
  // low z index so the draggers sit above the cancel listener div
  zIndex: 0,
});

const dirToDragger: {
  dir: DragDir;
  DragIcon: IconType;
  styles: React.CSSProperties;
}[] = [
  {
    dir: "top",
    DragIcon: BsArrowUp,
    styles: { gridArea: "top", cursor: "n-resize" },
  },
  {
    dir: "bottom",
    DragIcon: BsArrowDown,
    styles: { gridArea: "bottom", cursor: "s-resize" },
  },
  {
    dir: "left",
    DragIcon: BsArrowLeft,
    styles: { gridArea: "left", cursor: "w-resize" },
  },
  {
    dir: "right",
    DragIcon: BsArrowRight,
    styles: { gridArea: "right", cursor: "e-resize" },
  },
  {
    dir: "topLeft",
    DragIcon: BsArrowUpLeft,
    styles: { gridArea: "topLeft", cursor: "nw-resize" },
  },
  {
    dir: "topRight",
    DragIcon: BsArrowUpRight,
    styles: { gridArea: "topRight", cursor: "ne-resize" },
  },
  {
    dir: "bottomLeft",
    DragIcon: BsArrowDownLeft,
    styles: { gridArea: "bottomLeft", cursor: "sw-resize" },
  },
  {
    dir: "bottomRight",
    DragIcon: BsArrowDownRight,
    styles: { gridArea: "bottomRight", cursor: "se-resize" },
  },
];

// These cells are neccesary for the draging to know where it is on the page
// however they're just an implementation details so we leave them in here
// as a non-exported component
function GridCells() {
  const numRows = useRecoilValue(tractDims("rows"));
  const numCols = useRecoilValue(tractDims("cols"));

  return (
    <>
      {enumerateGridDims({ numRows, numCols }).map(({ row, col }) => (
        <div
          key={`Cell-r${row}-c${col}`}
          className="gridCell"
          css={{
            gridRow: row,
            gridColumn: col,
            // So the cell doesn't intercept element interactions like dragging
            pointerEvents: "none",
          }}
          data-row={row}
          data-col={col}
        />
      ))}
    </>
  );
}

const GridCellsMemo = React.memo(GridCells);

// I wish that I could bundle this in with the custom useDragHandler hook
// but then we loose a lot of performance because react rerenders the whole
// component at all times instead of just updating the styles when it's its
// own independent component

function DragFeedback() {
  // Initiate the drag watching behavior for new elements (see useEffect() below)
  // and also the existing elements being resized
  // useDragHandler();
  const dragState = useRecoilValue(dragStateAtom);

  if (!dragState) return null;

  const {
    dragBox: { left, right, top, bottom },
    xOffset,
    yOffset,
    gridPos,
    dragType: type,
  } = dragState;

  // If the drag box is of size zero, then the drag wont trigger anything on the
  // end. We check for this and then alert the user with a small tooltip
  const zeroSizeDrag = bottom === top && left === right;

  return (
    <>
      <div
        css={{
          position: "absolute",
          pointerEvents: "none",
          outline: "2px solid tomato",
          top: `${top - yOffset}px`,
          left: `${left - xOffset}px`,
          width: `${Math.abs(right - left)}px`,
          height: `${Math.abs(top - bottom)}px`,
        }}
      >
        {zeroSizeDrag && type === "NewItemDrag" ? (
          <div css={newItemBoxStyles}>Release to cancel drag</div>
        ) : null}
      </div>
      {type === "NewItemDrag" ? (
        <GridItemDiv
          css={{ border: "solid var(--rstudio-blue, pink)" }}
          {...gridPos}
        />
      ) : null}
    </>
  );
}

const newItemBoxStyles = css({
  fontSize: "0.8rem",
  width: "80px",
  marginTop: "5px",
  marginLeft: "-40px",
  textAlign: "center",
  background: "white",
  padding: "2px",
  boxShadow: "var(--shadow)",
  border: "1px solid var(--light-grey)",
  borderRadius: "var(--corner-radius)",
  color: "var(--rstudio-grey)",
});
