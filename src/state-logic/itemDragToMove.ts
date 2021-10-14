import { createMachine } from "xstate";

type MousePos = { x: number; y: number };

type DragEvent =
  | { type: "DRAG_START"; nameOfDragged: string }
  | { type: "DRAG"; pos: MousePos }
  | { type: "FINISH" };

type DragContext = {
  currentPos?: MousePos;
  itemName?: string;
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
        invoke: {
          id: "watchForMouseMove",
          src: (context, event) => (callback, onReceive) => {
            const sendDragEvent = (pos: MousePos) =>
              callback({ type: "DRAG", pos });

            document.addEventListener("mousemove", sendDragEvent);
            document.addEventListener("mouseup", () => callback("FINISH"), {
              once: true,
            });

            return () => {
              // Cleanup the mouse move indicator as it's no longer needed now
              // that we're exiting the dragging state
              document.removeEventListener("mousemove", sendDragEvent);
            };
          },
        },
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
