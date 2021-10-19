import { useMachine } from "@xstate/react";
import { GridItemDef } from "GridTypes";
import React, { useEffect } from "react";
import { useRecoilCallback, useRecoilTransaction_UNSTABLE } from "recoil";
import { setupClickAndDrag } from "utils/drag-helpers";
import {
  blockIsFree,
  findPositionOfBlock,
  getCurrentGridCellBounds,
  getItemDims,
  GridBlock,
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
  final,
}: {
  closestBlock?: GridBlock;
  itemName?: string;
  final?: boolean;
}) => void;

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
  itemName: string;
  availableBlocks: GridBlock[];
  closestBlock: GridBlock;
  moveToClosest: (type?: "final") => void;
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

        const { availableBlocks, itemBlock } = findAvailableBlocks({
          itemName,
          allItems: currentItems,
        });

        context.itemName = itemName;

        context.availableBlocks = availableBlocks;
        context.closestBlock = itemBlock;
        const moveToClosest = (
          type: "intermediate" | "final" = "intermediate"
        ) => {
          onMove({
            closestBlock: context.closestBlock,
            itemName: context.itemName,
            final: type === "final",
          });
        };
        context.moveToClosest = moveToClosest;

        // Start by setting position so the item is visually moving
        moveToClosest();
      },

      onDrag: (context, event) => {
        if (
          event.type !== "DRAG" ||
          !context.availableBlocks ||
          !context.moveToClosest
        )
          return;

        const currentClosestBlock = findClosestAvailableBlock(
          event.pos,
          context.availableBlocks
        );

        if (
          !sameGridPos(
            context.closestBlock?.gridPos,
            currentClosestBlock.gridPos
          )
        ) {
          context.closestBlock = currentClosestBlock;
          context.moveToClosest();
        }
      },

      onFinished: (context, event) => {
        if (
          typeof context.closestBlock === "undefined" ||
          !context.moveToClosest
        )
          return;

        context.moveToClosest("final");
      },
    },
  }
);

function distBetween(a: Point, b: Point) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

function findClosestAvailableBlock(currentPos: Point, blocks: GridBlock[]) {
  // Loop through all blocks possible to move to and keep track of the closest
  // one to the current drag.
  let distToClosest: number = Infinity;
  let currentClosestBlock: GridBlock = blocks[0];
  blocks.forEach((block) => {
    const distToBlock = distBetween(currentPos, block.center);
    if (distToBlock < distToClosest) {
      currentClosestBlock = block;
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
}): { availableBlocks: GridBlock[]; itemBlock: GridBlock } {
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

  const availableBlocks: GridBlock[] = [];

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
        availableBlocks.push(findPositionOfBlock(block, cellBounds));
      }
    }
  }
  return {
    availableBlocks,
    itemBlock: findPositionOfBlock(itemToMove, cellBounds),
  };
}

export function useDragToMove() {
  const [, sendToDragMachine] = useMachine(dragMachine);

  // We're using a callback here instead of a transaction because the callbacks
  // can be used to set things from within a transaction without triggering
  // issues due to them not causing effects until the next tick when used async.
  const moveItem = useRecoilCallback(
    ({ snapshot, set }) => async ({
      closestBlock,
      itemName,
      final,
    }: {
      closestBlock: GridBlock;
      itemName: string;
      final: boolean;
    }) => {
      const draggedItem = await snapshot.getPromise(gridItemAtoms(itemName));
      if (draggedItem === null) return;

      const newPosition = final
        ? {
            ...draggedItem,
            ...closestBlock.gridPos,
            absoluteBounds: undefined,
          }
        : {
            ...draggedItem,
            absoluteBounds: closestBlock.bounds,
          };
      set(gridItemAtoms(itemName), newPosition);
    },
    []
  );

  const startDrag = useRecoilTransaction_UNSTABLE(
    ({ get }) => (nameOfDragged: string) => {
      sendToDragMachine("DRAG_START", {
        nameOfDragged,
        currentItems: gatherAllItems(get),
        onMove: moveItem,
      });
    },
    [sendToDragMachine]
  );

  const { onMouseDown, cleanupFn } = React.useMemo(() => {
    return setupClickAndDrag({
      onStart: startDrag,
      onMove: (pos: MousePos) => sendToDragMachine({ type: "DRAG", pos }),
      onFinish: () => sendToDragMachine("FINISH"),
    });
  }, [sendToDragMachine, startDrag]);

  useEffect(() => cleanupFn, [cleanupFn]);

  return { startMoving: onMouseDown };
}
