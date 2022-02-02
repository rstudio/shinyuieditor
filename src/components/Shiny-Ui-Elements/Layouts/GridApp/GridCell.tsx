import { IconButton } from "@chakra-ui/button";
import { defaultSettingsForElements } from "components/Shiny-Ui-Elements/Elements/uiComponentAndSettings";
import { ShinyUiNames } from "components/Shiny-Ui-Elements/uiNodeTypes";
import NodeUpdateContext from "components/Shiny-Ui-Elements/UiNode/NodeUpdateContext";
import debounce from "just-debounce-it";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { enumerateGridDims, toStringLoc } from "utils/grid-helpers";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import { getBBoxOfDiv } from "utils/overlap-helpers";
import { CellLocRef, LayoutDispatchContext } from ".";

function GridCell({
  gridRow,
  gridColumn,
  cellLocations,
  onClick,
}: {
  gridRow: number;
  gridColumn: number;
  cellLocations: CellLocRef;
  onClick?: ({ row, col }: { row: number; col: number }) => void;
}) {
  const gridPos = toStringLoc({ row: gridRow, col: gridColumn });
  const cellRef = React.useRef<HTMLDivElement>(null);
  const isClickable = typeof onClick !== "undefined";
  const nodeUpdaters = React.useContext(NodeUpdateContext);
  const layoutDispatch = React.useContext(LayoutDispatchContext);

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
      onDragOver={(e) => {
        console.log("Dragged over cell", { gridRow, gridColumn });
        if (cellRef.current) {
          cellRef.current.style.outline = "2px solid salmon";
        }
      }}
      onDrop={(e) => {
        e.stopPropagation();
        // Get the type of dropped element and act on it
        const nameOfDroppedUi = e.dataTransfer.getData(
          "element-type"
        ) as ShinyUiNames;

        console.log("Cell had " + nameOfDroppedUi + " dropped on it");
        // For right now we'll just use the default settings for the
        // dropped ui element
        const newElement = defaultSettingsForElements.find(
          ({ uiName }) => uiName === nameOfDroppedUi
        );

        if (!newElement) {
          throw new Error(
            "Could not find default settings for node of type " +
              nameOfDroppedUi
          );
        }

        // This will eventually filter by element type
        const allowedDrop = true;

        const newAreaName = "MyNewGridArea";
        layoutDispatch?.({
          type: "ADD_ITEM",
          name: newAreaName,
          pos: {
            rowStart: gridRow,
            rowEnd: gridRow,
            colStart: gridColumn,
            colEnd: gridColumn,
          },
        });

        // Let the state know we have a new child node
        nodeUpdaters({
          type: "ADD_NODE",
          parentPath: [],
          newNode: {
            uiName: "gridlayout::grid_panel",
            uiArguments: {
              area: newAreaName,
              horizontalAlign: "spread",
              verticalAlign: "spread",
            },
            uiChildren: [newElement],
          },
        });
      }}
    >
      {isClickable ? (
        <IconButton
          icon={<FaPlus />}
          aria-label={`Add new item at row ${gridRow} column ${gridColumn}`}
          onClick={() => onClick({ row: gridRow, col: gridColumn })}
        />
      ) : null}
    </div>
  );
}

export function GridCells({
  numRows,
  numCols,
  cellLocRef,
  onClick,
}: Pick<ReturnType<typeof parseGridTemplateAreas>, "numCols" | "numRows"> & {
  cellLocRef: CellLocRef;
  onClick?: ({ row, col }: { row: number; col: number }) => void;
}) {
  return (
    <>
      {enumerateGridDims({
        numRows,
        numCols,
      }).map(({ row, col }) => (
        <GridCell
          key={toStringLoc({ row, col })}
          gridRow={row}
          gridColumn={col}
          cellLocations={cellLocRef}
          onClick={onClick}
        />
      ))}
    </>
  );
}
