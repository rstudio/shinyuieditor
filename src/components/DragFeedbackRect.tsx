/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { dragStateAtom } from "../state-logic/itemDragging";
import { GridItemDiv } from "./GridItemDiv";

export const newItemBoxStyles = css({
  fontSize: "0.8rem",
  width: "80px",
  marginTop: "5px",
  marginLeft: "-40px",
  textAlign: "center",
  background: "white",
  padding: "2px",
  boxShadow: "var(--shadow)",
  border: "1px solid var(--light-grey)",
  borderRadius: "var(--corner-radius)",
  color: "var(--rstudio-grey)",
});

// I wish that I could bundle this in with the custom useDragHandler hook
// but then we loose a lot of performance because react rerenders the whole
// component at all times instead of just updating the styles when it's its
// own independent component
export function DragFeedbackRect() {
  // Initiate the drag watching behavior for new elements (see useEffect() below)
  // and also the existing elements being resized
  // useDragHandler();
  const dragState = useRecoilValue(dragStateAtom);

  if (!dragState) return null;

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
        css={{
          position: "absolute",
          pointerEvents: "none",
          outline: "2px solid tomato",
          top: `${top - yOffset}px`,
          left: `${left - xOffset}px`,
          width: `${Math.abs(right - left)}px`,
          height: `${Math.abs(top - bottom)}px`,
        }}
      >
        {zeroSizeDrag && type === "NewItemDrag" ? (
          <div css={newItemBoxStyles}>Release to cancel drag</div>
        ) : null}
      </div>
      {type === "NewItemDrag" ? (
        <GridItemDiv
          css={{ border: "solid var(--rstudio-blue, pink)" }}
          {...gridPos}
        />
      ) : null}
    </>
  );
}
