import { useMachine } from "@xstate/react";
import { GridItemDef, GridPos } from "GridTypes";
import React from "react";
import { useRecoilTransaction_UNSTABLE } from "recoil";
import {
  blockIsFree,
  findCenterOfBlock,
  getCurrentGridCellBounds,
  getItemDims,
  gridDimsFromCellBounds,
  GridLocString,
  gridLocString,
  sameGridPos,
} from "utils/grid-helpers";
import { createMachine } from "xstate";
import { gatherAllItems, gridItemAtoms } from "./gridItems";

type Point = { x: number; y: number };
type MousePos = Point;

type ItemMoverFn = ({
  closestBlock,
  itemName,
}: {
  closestBlock?: GridPos;
  itemName?: string;
}) => void;

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
      onMove: ItemMoverFn;
    }
  | { type: "DRAG"; pos: MousePos }
  | { type: "FINISH" };

type ActiveDrag = {
  currentPos: MousePos;
  itemName: string;
  availableBlocks: AvailableBlocks;
  closestBlock: GridPos;
  onMove: ItemMoverFn;
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
        const { nameOfDragged: itemName, currentItems, onMove } = event;

        context.itemName = itemName;
        context.onMove = onMove;
        context.availableBlocks = findAvailableBlocks({
          itemName,
          allItems: currentItems,
        });

        console.log(`---Action: DRAG_START`);
      },

      onDrag: (context, event) => {
        if (
          event.type !== "DRAG" ||
          !context.availableBlocks ||
          !context.onMove
        )
          return;

        const currentClosestBlock = findClosestAvailableBlock(
          event.pos,
          context.availableBlocks
        );

        if (!sameGridPos(context.closestBlock, currentClosestBlock)) {
          context.closestBlock = currentClosestBlock;
          context.onMove({
            itemName: context.itemName,
            closestBlock: currentClosestBlock,
          });
        }
      },

      onFinished: (context, event) => {
        console.log("---Action: FINISH");
      },
    },
  }
);

function distBetween(a: Point, b: Point) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

function findClosestAvailableBlock(currentPos: Point, blocks: AvailableBlocks) {
  // Loop through all blocks possible to move to and keep track of the closest
  // one to the current drag.
  let distToClosest: number = Infinity;
  let currentClosestBlock: GridPos = blocks[0].gridPos;
  blocks.forEach(({ gridPos, center }) => {
    const distToBlock = distBetween(currentPos, center);
    if (distToBlock < distToClosest) {
      currentClosestBlock = gridPos;
      distToClosest = distToBlock;
    }
  });

  return currentClosestBlock;
}

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

  const moveSelectedItem = useRecoilTransaction_UNSTABLE(
    ({ get, set }) => ({
      closestBlock,
      itemName,
    }: {
      closestBlock: GridPos;
      itemName: string;
    }) => {
      const draggedItem = get(gridItemAtoms(itemName));
      if (draggedItem === null) return;
      set(gridItemAtoms(itemName), {
        ...draggedItem,
        ...closestBlock,
      });
    },
    []
  );

  const sendDragEvent = React.useCallback(
    (pos: MousePos) => sendToDragMachine({ type: "DRAG", pos }),
    [sendToDragMachine]
  );

  const startMoving = useRecoilTransaction_UNSTABLE(
    ({ get }) => (nameOfDragged: string) => {
      sendToDragMachine("DRAG_START", {
        nameOfDragged,
        currentItems: gatherAllItems(get),
        onMove: moveSelectedItem,
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
    [sendDragEvent, sendToDragMachine]
  );

  // Cleanup the mouse move indicator to avoid memory leaks in the chance that
  // We never called the mouseup event
  React.useEffect(
    () => () => document.removeEventListener("mousemove", sendDragEvent),
    [sendDragEvent]
  );

  return { startMoving };
}
