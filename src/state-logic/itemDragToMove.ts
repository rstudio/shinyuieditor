import { useMachine } from "@xstate/react";
import { GridItemDef, GridPos } from "GridTypes";
import React from "react";
import { useRecoilValue } from "recoil";
import {
  blockIsFree,
  findCenterOfBlock,
  getCurrentGridCellBounds,
  getItemDims,
  gridDimsFromCellBounds,
  GridLocString,
  gridLocString,
} from "utils/grid-helpers";
import { createMachine } from "xstate";
import { combinedItemsState } from "./gridItems";

type Point = { x: number; y: number };
type MousePos = Point;

type AvailableBlocks = {
  gridPos: GridPos;
  center: Point;
}[];
type DragEvent =
  | {
      type: "DRAG_START";
      nameOfDragged: string;
      gridCellPositions: ReturnType<typeof getCurrentGridCellBounds>;
      currentItems: GridItemDef[];
    }
  | { type: "DRAG"; pos: MousePos }
  | { type: "FINISH" };

type ActiveDrag = {
  currentPos: MousePos;
  itemName: string;
  currentItems: GridItemDef[];
  availableBlocks: AvailableBlocks;
};

type DragContext = Partial<ActiveDrag>;

// Add input of all item names to initial start drag
// See if I can get what I need from item positions in grid terms and the
// grid cells info to avoid another recoil call and just have to pass in the
// current grid items to the DragStart call.
type DragTypeState =
  | {
      value: "idle";
      context: DragContext;
    }
  | {
      value: "dragging";
      context: ActiveDrag;
    };

export const dragMachine = createMachine<DragContext, DragEvent, DragTypeState>(
  {
    // Machine identifier
    id: "dragToMove",

    // Value we start in
    initial: "idle",

    // Initial context value for dragged object
    context: {},

    // State definitions
    states: {
      idle: {
        on: {
          DRAG_START: {
            actions: ["onStart"],
            target: "dragging",
          },
        },
      },

      dragging: {
        on: {
          DRAG: {
            actions: ["onDrag"],
            target: "dragging",
            internal: true,
          },
          FINISH: {
            actions: ["onFinished"],
            target: "idle",
          },
        },
      },
    },
  },
  {
    actions: {
      onStart: (context, event) => {
        if (event.type !== "DRAG_START") return;
        const { nameOfDragged: itemName, currentItems } = event;

        context.itemName = itemName;
        context.currentItems = currentItems;
        context.availableBlocks = findAvailableBlocks({
          itemName,
          allItems: currentItems,
        });

        debugger;
        console.log(`---Action: DRAG_START`);
      },

      onDrag: (context, event) => {
        if (event.type !== "DRAG") return;
        console.log("---Action: DRAG");
      },

      onFinished: (context, event) => {
        console.log("---Action: FINISH");
      },
    },
  }
);

function findAvailableBlocks({
  itemName,
  allItems,
}: {
  itemName: string;
  allItems: GridItemDef[];
}): AvailableBlocks {
  const itemToMove = allItems.find((item) => item.name === itemName);
  if (!itemToMove)
    throw new Error("Could not find the currently selected item");

  const windowSize = getItemDims(itemToMove);

  const cellBounds = getCurrentGridCellBounds();
  const {
    numCols: numColsInGrid,
    numRows: numRowsInGrid,
  } = gridDimsFromCellBounds(cellBounds);

  // First take note of all the cells that are occupied
  const occupiedCells = new Set<GridLocString>();
  allItems.forEach((item) => {
    // We want to consider the cells occupied by the dragged item as
    // "available" so it consider positions that overlap its current
    if (item.name === itemName) return;
    for (let row = item.startRow; row <= item.endRow; row++) {
      for (let col = item.startCol; col <= item.endCol; col++) {
        occupiedCells.add(gridLocString({ row, col }));
      }
    }
  });

  const availableBlocks: AvailableBlocks = [];

  for (
    let rowStart = 1;
    rowStart <= numRowsInGrid - windowSize.numRows + 1;
    rowStart++
  ) {
    for (
      let colStart = 1;
      colStart <= numColsInGrid - windowSize.numCols + 1;
      colStart++
    ) {
      // First check if the selection box is valid (aka nothing within it is
      // taken up by an existing item)
      const block = {
        startRow: rowStart,
        endRow: rowStart + windowSize.numRows - 1,
        startCol: colStart,
        endCol: colStart + windowSize.numCols - 1,
      };

      if (blockIsFree(block, occupiedCells)) {
        availableBlocks.push({
          gridPos: block,
          center: findCenterOfBlock(block, cellBounds),
        });
      }
    }
  }

  return availableBlocks;
}

export function useDragToMove() {
  const [currentDrag, sendToDragMachine] = useMachine(dragMachine);
  const currentItems = useRecoilValue(combinedItemsState);
  console.log(currentDrag);
  const sendDragEvent = React.useCallback(
    (pos: MousePos) => sendToDragMachine({ type: "DRAG", pos }),
    [sendToDragMachine]
  );

  const startMoving = React.useCallback(
    (nameOfDragged: string) => {
      sendToDragMachine("DRAG_START", {
        nameOfDragged,
        currentItems,
      });
      document.addEventListener("mousemove", sendDragEvent);
      document.addEventListener(
        "mouseup",
        () => {
          sendToDragMachine("FINISH");
          document.removeEventListener("mousemove", sendDragEvent);
        },
        {
          once: true,
        }
      );
    },
    [currentItems, sendDragEvent, sendToDragMachine]
  );

  // Cleanup the mouse move indicator to avoid memory leaks in the chance that
  // We never called the mouseup event
  React.useEffect(
    () => () => document.removeEventListener("mousemove", sendDragEvent),
    [sendDragEvent]
  );

  return { startMoving };
}
