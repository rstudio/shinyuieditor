import { useRecoilValue } from "recoil";
import { GridItem } from "../GridItem";
import { dragStateAtom } from "../../state-logic/itemDragging";
import classes from "./style.module.css";

// I wish that I could bundle this in with the custom useDragHandler hook
// but then we loose a lot of performance because react rerenders the whole
// component at all times instead of just updating the styles when it's its
// own independent component

export const DragFeedback = () => {
  // Initiate the drag watching behavior for new elements (see useEffect() below)
  // and also the existing elements being resized
  // useDragHandler();
  const dragState = useRecoilValue(dragStateAtom);

  if (!dragState) return <div style={{ display: "none" }}></div>;

  const {
    dragBox: { left, right, top, bottom },
    xOffset,
    yOffset,
    gridPos,
    dragType: type,
  } = dragState;

  // If the drag box is of size zero, then the drag wont trigger anything on the
  // end. We check for this and then alert the user with a small tooltip
  const zeroSizeDrag = bottom === top && left === right;

  return (
    <>
      <div
        className={classes.dragBox}
        style={{
          top: `${top - yOffset}px`,
          left: `${left - xOffset}px`,
          width: `${Math.abs(right - left)}px`,
          height: `${Math.abs(top - bottom)}px`,
        }}
      >
        {zeroSizeDrag && type === "NewItemDrag" ? (
          <div className={classes.cancelDragTooltip}>
            Release to cancel drag
          </div>
        ) : null}
      </div>
      {type === "NewItemDrag" ? (
        <GridItem className={classes.gridFeedbackBox} {...gridPos} />
      ) : null}
    </>
  );
};
