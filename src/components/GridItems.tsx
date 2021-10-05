/** @jsxImportSource @emotion/react */

import { css } from "@chakra-ui/styled-system";
import { DragDir, GridItemDef } from "GridTypes";
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
import { useGridDragger } from "state-logic/itemDragging";
import { GridItemDiv } from "./GridItemDiv";

export default function GridItems({ items }: { items: GridItemDef[] }) {
  const [selectedName, setSelectedName] = React.useState<string | null>(null);

  const selectedItem = items.find((item) => item.name === selectedName) ?? null;
  console.log({ items, selectedName, selectedItem });
  // const toggleSelectedItem = () => {};
  return (
    <>
      {items.map((item) => (
        <GridItemDiv
          css={itemStyles}
          {...item}
          onClick={() => setSelectedName(item.name)}
          title={item.name}
          aria-label={`${item.name}-item`}
        />
      ))}

      <SelectedItemOverlay selectedItem={selectedItem} />
    </>
  );
}

const itemStyles = css({
  backgroundColor: "var(--color, rgba(34, 139, 34, 0.835))",
  borderRadius: "var(--corner-radius)",
});

function SelectedItemOverlay({
  selectedItem,
}: {
  selectedItem: GridItemDef | null;
}) {
  // const resetSelection = useResetRecoilState(selectedItemNameState);
  const itemRef = React.useRef<HTMLDivElement>(null);
  const startDrag = useGridDragger(itemRef);

  // The reason that we have a separate div for triggering the resetting of the
  // selected item is because if the click event was listening on the main div
  // it's really hard to differentiate between the drag events and the click to
  // close events, whereas the mouse-down on a drag handle wont trigger a click
  // event on the cancelBox div behind it.

  if (selectedItem === null) return null;

  return (
    <GridItemDiv ref={itemRef} css={overlayStyles} {...selectedItem}>
      {dirToDragger.map(({ dir, DragIcon, label, styles }) => (
        <span
          key={dir}
          css={{
            color: "var(--light-grey, blue)",
            placeSelf: "center",
            padding: "4px",
            zIndex: 1000, //High z index so the draggers sit above the cancel listener div
            ...styles,
          }}
          aria-label={label}
          onMouseDown={(e) => {
            startDrag(e, dir);
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <DragIcon size="1.3rem" />
        </span>
      ))}
      {/* <SettingsToolbar name={selectedItem.name} /> */}
      <div
        css={cancelBoxStyles}
        onClick={() => {
          // resetSelection();
        }}
      />
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
