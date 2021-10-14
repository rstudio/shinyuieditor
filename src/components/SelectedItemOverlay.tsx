/** @jsxImportSource @emotion/react */
import { IconButton } from "@chakra-ui/button";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { GridItemDiv } from "components/GridItemDiv";
import * as React from "react";
import { IconType } from "react-icons";
import { BiMove } from "react-icons/bi";
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
import { FaTrash } from "react-icons/fa";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  selectedItemNameState,
  selectedItemState,
  useDeleteItem,
} from "state-logic/gridItems";
import { useGridDragger } from "state-logic/itemDragging";
import { dragMachine } from "state-logic/itemDragToMove";
import { DragDir, GridItemDef } from "../GridTypes";
import { useMachine } from "@xstate/react";

export function SelectedItemOverlay() {
  const resetSelection = useResetRecoilState(selectedItemNameState);
  const selectedItem = useRecoilValue(selectedItemState);
  const itemRef = React.useRef<HTMLDivElement>(null);
  const startDrag = useGridDragger(itemRef);

  const [currentDrag, sendToDragMachine] = useMachine(dragMachine);

  // The reason that we have a separate div for triggering the resetting of the
  // selected item is because if the click event was listening on the main div
  // it's really hard to differentiate between the drag events and the click to
  // close events, whereas the mouse-down on a drag handle wont trigger a click
  // event on the cancelBox div behind it.

  if (selectedItem === null) return null;

  return (
    <GridItemDiv ref={itemRef} css={overlayStyles} {...selectedItem}>
      {dirToDragger.map(({ dir, DragIcon, label, styles }) => (
        <IconHolder
          key={dir}
          css={{ ...styles }}
          aria-label={label}
          onMouseDown={(e) => startDrag(e, dir)}
          onClick={(e) => e.stopPropagation()}
        >
          <DragIcon size="1.3rem" />
        </IconHolder>
      ))}
      <IconHolder css={{ gridArea: "middle", cursor: "grab" }}>
        <BiMove
          onMouseDown={() =>
            sendToDragMachine("DRAG_START", {
              nameOfDragged: selectedItem.name,
            })
          }
          onClick={(e) => e.stopPropagation()}
        />
      </IconHolder>
      <SettingsToolbar name={selectedItem.name} />
      <div
        css={cancelBoxStyles}
        onClick={() => {
          resetSelection();
        }}
      />
    </GridItemDiv>
  );
}

function SettingsToolbar({ name }: { name: GridItemDef["name"] }) {
  const deleteItem = useDeleteItem();

  return (
    <div
      css={{
        "--inset": "var(--corner-radius)",
        "--w": "min(calc(100% - 2*var(--inset)), 250px)",
        position: "absolute",
        borderRadius: "var(--corner-radius)",
        width: "var(--w)",
        right: "calc(50% - var(--w)/2)",
        boxShadow: "var(--shadow)",
        background: "var(--rstudio-blue)",
        color: "white",
        bottom: "100%",
        display: "flex",
        flexWrap: "wrap",
        padding: "0.2rem 0.5rem",
        gap: "5px",
        justifyContent: "space-evenly",
        alignItems: "center",
        fontWeight: 500,
      }}
    >
      <span>{name}</span>
      <IconButton
        h="100%"
        padding="3px"
        variant="outline"
        title={"Delete " + name}
        aria-label={"Delete " + name}
        icon={<FaTrash />}
        onClick={(e) => {
          e.stopPropagation();
          deleteItem(name);
        }}
      />
    </div>
  );
}

const IconHolder = styled.span({
  color: "var(--light-grey, blue)",
  placeSelf: "center",
  padding: "4px",
  zIndex: 1000, //High z index so the draggers sit above the cancel listener div
});

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
  label: string;
  styles: React.CSSProperties;
}[] = [
  {
    dir: "top",
    label: "Resize up",
    DragIcon: BsArrowUp,
    styles: { gridArea: "top", cursor: "n-resize" },
  },
  {
    dir: "bottom",
    label: "Resize down",
    DragIcon: BsArrowDown,
    styles: { gridArea: "bottom", cursor: "s-resize" },
  },
  {
    dir: "left",
    label: "Resize left",
    DragIcon: BsArrowLeft,
    styles: { gridArea: "left", cursor: "w-resize" },
  },
  {
    dir: "right",
    label: "Resize right",
    DragIcon: BsArrowRight,
    styles: { gridArea: "right", cursor: "e-resize" },
  },
  {
    dir: "topLeft",
    label: "Resize upper-left",
    DragIcon: BsArrowUpLeft,
    styles: { gridArea: "topLeft", cursor: "nw-resize" },
  },
  {
    dir: "topRight",
    label: "Resize upper-right",
    DragIcon: BsArrowUpRight,
    styles: { gridArea: "topRight", cursor: "ne-resize" },
  },
  {
    dir: "bottomLeft",
    label: "Resize lower-left",
    DragIcon: BsArrowDownLeft,
    styles: { gridArea: "bottomLeft", cursor: "sw-resize" },
  },
  {
    dir: "bottomRight",
    label: "Resize lower-right",
    DragIcon: BsArrowDownRight,
    styles: { gridArea: "bottomRight", cursor: "se-resize" },
  },
];
