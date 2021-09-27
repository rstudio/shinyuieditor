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
import { DragDir } from "../GridTypes";
import {
  selectedItemNameState,
  selectedItemState,
} from "../state-logic/gridItems";
import { useGridDragger } from "../state-logic/itemDragging";
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
          // onMouseDown={(e) => {
          //   startDrag(e, dir);
          // }}
          // onClick={(e) => e.stopPropagation()}
        >
          <DragIcon size="1.3rem" />
        </span>
      ))}
      {/* <div
        className={classes.cancelBox}
        onClick={() => {
          resetSelection();
        }}
      /> */}
    </GridItemDiv>
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
