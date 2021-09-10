import { useRecoilValue } from "recoil";
import { GridItem } from "./GridItem";
import { dragStateAtom } from "../state-logic/itemDragging";
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

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: `${top - yOffset}px`,
          left: `${left - xOffset}px`,
          width: `${Math.abs(right - left)}px`,
          height: `${Math.abs(top - bottom)}px`,
          pointerEvents: "none",
          outline: `3px solid ${
            dragState.dragType === "ResizeItemDrag" ? "red" : "blue"
          }`,
        }}
      />
      {type === "NewItemDrag" ? (
        <GridItem
          {...gridPos}
          styles={{
            border: "2px solid tomato",
          }}
        />
      ) : null}
    </>
  );
};
