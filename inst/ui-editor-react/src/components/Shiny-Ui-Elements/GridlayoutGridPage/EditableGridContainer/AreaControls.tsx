import * as React from "react";

import classes from "./resizableGrid.module.css";

export function AreaControls({ area }: { area: string }) {
  const controls_ref = React.useRef(null);

  const { startDrag, resizeState, beingResized, dragListeners } =
    useDragToResizeItem({
      controls_ref,
    });
  return (
    <>
      <div
        className={classes.resizeOverlay}
        data-being-resized={beingResized}
        {...dragListeners}
      />
      <div
        ref={controls_ref}
        className={classes.areaControls}
        style={resizeState ? resizeState.currentPosition : { gridArea: area }}
        data-being-resized={beingResized}
      >
        <div className={classes.upperLeftSizer} onMouseDown={startDrag}></div>
        <div className={classes.lowerRightSizer} onMouseDown={startDrag}></div>
      </div>
    </>
  );
}

type ResizeDirection = "lower-right" | "upper-left";
type ResizeState = {
  direction: ResizeDirection;
  currentPosition: ItemAbsolutePosition;
} | null;

type ItemAbsolutePosition = {
  left: number;
  top: number;
  width: number;
  height: number;
};
type EventPosition = {
  x: number;
  y: number;
};

function useDragToResizeItem({
  controls_ref,
}: {
  controls_ref: React.Ref<HTMLElement>;
}) {
  const [resizeState, setResizeState] = React.useState<ResizeState>(null);
  const dragPositions = React.useRef<
    (ItemAbsolutePosition & EventPosition) | null
  >(null);

  const beingResized = resizeState !== null;

  const startDrag: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    (e) => {
      const handleEl = e.currentTarget;
      const direction: ResizeDirection = handleEl.classList.contains(
        classes.lowerRightSizer
      )
        ? "lower-right"
        : "upper-left";

      const areaOverlayEl = handleEl.parentElement;
      if (areaOverlayEl === null)
        throw new Error("No parent for handle somehow");

      const {
        offsetLeft: left,
        offsetTop: top,
        offsetWidth: width,
        offsetHeight: height,
      } = areaOverlayEl;

      const itemPosition = {
        left,
        top,
        width,
        height,
      };

      dragPositions.current = { ...itemPosition, ...getMouseEventPosition(e) };
      setResizeState({
        direction,
        currentPosition: itemPosition,
      });

      console.log("Started dragging!", {
        direction,
        left: handleEl.offsetLeft,
        top: handleEl.offsetTop,
        width: handleEl.offsetWidth,
        height: handleEl.offsetHeight,
      });

      console.log("mouse event", e);
    },
    []
  );

  const updateDrag: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    (e) => {
      console.log("Dragging dragging dragging!");
      if (!dragPositions.current) {
        console.error("Somehow updating drag without start values");
        return;
      }
      const currentDragPosition = getMouseEventPosition(e);
      const dragDelta = getPositionDelta(
        dragPositions.current,
        currentDragPosition
      );
      console.log("Drag Delta", dragDelta);
      setResizeState((oldState) => {
        if (oldState === null) return null;
        const { currentPosition, direction } = oldState;
        const newPosition = { ...currentPosition };
        newPosition.width += dragDelta.x;
        newPosition.height += dragDelta.y;
        return {
          direction,
          currentPosition: newPosition,
        };
      });
      // debugger;
      // e.
    },
    []
  );

  const finishDrag: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    (e) => {
      console.log("Finished with the drag");
      setResizeState(null);
    },
    []
  );

  const dragListeners = React.useMemo(() => {
    if (beingResized) {
      return {
        onMouseMove: updateDrag,
        onMouseUp: finishDrag,
      };
    }
    return undefined;
  }, [beingResized, finishDrag, updateDrag]);

  React.useEffect(() => {}, []);

  return {
    startDrag,
    resizeState,
    beingResized,
    dragListeners,
  };
}

function getMouseEventPosition(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
): EventPosition {
  return { x: e.screenX, y: e.screenY };
}

function getPositionDelta(
  start: EventPosition,
  end: EventPosition
): EventPosition {
  return {
    x: end.x - start.x,
    y: end.y - start.y,
  };
}
