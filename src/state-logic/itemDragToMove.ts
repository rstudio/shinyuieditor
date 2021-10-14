import { useMachine } from "@xstate/react";
import React from "react";
import { useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { createMachine } from "xstate";
import { gridItemNames } from "./gridItems";
import { getCurrentGridCellBounds, getItemGridBounds } from "./itemDragging";

type MousePos = { x: number; y: number };

type DragEvent =
  | {
      type: "DRAG_START";
      nameOfDragged: string;
      gridCellPositions: ReturnType<typeof getCurrentGridCellBounds>;
      gridItemPositions: ReturnType<typeof getItemGridBounds>;
    }
  | { type: "DRAG"; pos: MousePos }
  | { type: "FINISH" };

type DragContext = {
  currentPos?: MousePos;
  itemName?: string;
  gridCellPositions?: ReturnType<typeof getCurrentGridCellBounds>;
  gridItemPositions?: ReturnType<typeof getItemGridBounds>;
};

type DragTypeState =
  | {
      value: "idle";
      context: DragContext;
    }
  | {
      value: "dragging";
      context: {
        currentPos: MousePos;
        itemName: string;
        gridCellPositions: ReturnType<typeof getCurrentGridCellBounds>;
        gridItemPositions: ReturnType<typeof getItemGridBounds>;
      };
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
        context.itemName = event.nameOfDragged;
        context.gridCellPositions = event.gridCellPositions;
        context.gridItemPositions = event.gridItemPositions;

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

export function useDragToMove() {
  const itemNames = useRecoilValue(gridItemNames);
  const [currentDrag, sendToDragMachine] = useMachine(dragMachine);

  console.log(currentDrag);
  const sendDragEvent = React.useCallback(
    (pos: MousePos) => sendToDragMachine({ type: "DRAG", pos }),
    [sendToDragMachine]
  );

  const startDragToMove = useRecoilTransaction_UNSTABLE(
    ({ get }) => (nameOfDragged: string) => {
      const gridCellPositions = getCurrentGridCellBounds();
      const gridItemPositions = getItemGridBounds(
        itemNames,
        get,
        gridCellPositions
      );

      sendToDragMachine("DRAG_START", {
        nameOfDragged,
        gridCellPositions,
        gridItemPositions,
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
    }
  );

  // Cleanup the mouse move indicator to avoid memory leaks in the chance that
  // We never called the mouseup event
  React.useEffect(
    () => () => document.removeEventListener("mousemove", sendDragEvent),
    [sendDragEvent]
  );

  return { startDragToMove };
}
