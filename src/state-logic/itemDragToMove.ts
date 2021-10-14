import {
  createMachine,
  State,
  actions,
  assign,
  send,
  sendParent,
  interpret,
  spawn,
} from "xstate";
import { ItemBoundingBox } from "utils/overlap-helpers";
import { GridPos } from "GridTypes";
import { ActiveDrag } from "./itemDragging";

type MousePos = { x: number; y: number };
type GridItemBoundingBox = ItemBoundingBox & GridPos;

type DragEvent =
  | { type: "DRAG_START"; dragDir: ActiveDrag["dragBox"]["dir"] }
  | { type: "DRAG"; pos: MousePos }
  | { type: "FINISH" };

type DragContext = {
  currentPos?: MousePos;
  dragDir?: ActiveDrag["dragBox"]["dir"];
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
        dragDir: ActiveDrag["dragBox"]["dir"];
      };
    };

const dragMachine = createMachine<DragContext, DragEvent, DragTypeState>(
  {
    // Machine identifier
    id: "dragging",

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
        context.dragDir = event.dragDir;
        console.log("---Action: Starting to drag!");
      },
      onDrag: (context, event) => {
        if (event.type !== "DRAG") return;
        console.log("---Action: Dragging is happening!", event, context);
      },
      onFinished: (context, event) => {
        console.log("---Action: Finished dragging!");
      },
    },
  }
);
export default dragMachine;
