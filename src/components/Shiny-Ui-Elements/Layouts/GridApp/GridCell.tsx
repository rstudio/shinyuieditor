import { IconButton } from "@chakra-ui/button";
import debounce from "just-debounce-it";
import PortalModal from "Portal";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { toStringLoc } from "utils/grid-helpers";
import { getBBoxOfDiv } from "utils/overlap-helpers";
import { CellLocRef } from ".";

type DragAndDropHandlers = Pick<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "onDrop" | "onDragOver"
>;

export function GridCell({
  gridRow,
  gridColumn,
  cellLocations,
  onClick,
  ...dropHandlers
}: {
  gridRow: number;
  gridColumn: number;
  cellLocations: CellLocRef;
  onClick?: ({ row, col }: { row: number; col: number }) => void;
} & DragAndDropHandlers) {
  const gridPos = toStringLoc({ row: gridRow, col: gridColumn });
  const cellRef = React.useRef<HTMLDivElement>(null);
  const isClickable = typeof onClick !== "undefined";
  const [showPortal, setShowPortal] = React.useState(false);
  console.log({ showPortal });
  const updateSize = React.useMemo(
    () =>
      debounce(() => {
        try {
          // The debouncedness of this causes it to fire after cell may have been removed
          cellLocations.current[gridPos] = getBBoxOfDiv(cellRef.current);
        } catch {
          console.error("Failed to get bbox for grid cell");
        }
      }, 500),
    [cellLocations, gridPos]
  );

  React.useEffect(() => {
    // Watch for changes in the size of a given cell and update it's recorded size accordingly.
    // This means we know we're getting up-to-date sizing info for our dragging/moving of
    // elements within the grid.

    // Test environment is node and thus doesn't have access to ResizeObserver
    if (typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => updateSize());

    if (cellRef.current) ro.observe(cellRef.current);

    // Run resize once on load so we dont have to wait for a resize event to have size info
    updateSize();

    return () => ro.disconnect();
  }, [gridPos, updateSize]);

  return (
    <div
      className="grid-cell"
      ref={cellRef}
      style={{
        gridRow,
        gridColumn,
        backgroundColor: "var(--light-grey, pink)",
        opacity: 0.2,
        display: "grid",
        placeContent: "center",
      }}
      {...dropHandlers}
    >
      {isClickable ? (
        <IconButton
          icon={<FaPlus />}
          aria-label={`Add new item at row ${gridRow} column ${gridColumn}`}
          onClick={() => {
            console.log("Clicked show portal!");
            setShowPortal(true);
          }}
        />
      ) : null}
      {showPortal ? <PortalModal>Hi, I'm a portal</PortalModal> : null}
    </div>
  );
}
