import styled from "@emotion/styled";
import { TractPosition } from "state-logic/gridLayout/atoms";
import { placeOnGridOrCol } from "utils/grid-helpers";

const rowGutterStyles = {
  marginLeft: `calc(-1 * var(--gap))`,
  width: `calc(100% + 2*var(--gap))`,
  height: "100%",
};
const colGutterStyles = {
  marginTop: `calc(-1 * var(--gap) - var(--card-header-height) )`,
  height: `calc(100% + 2*var(--gap) + var(--card-header-height))`,
  width: "100%",
};
export const TractGutter = styled.div(({ dir, index }: TractPosition) => ({
  display: "grid",
  position: "relative",
  // We dont want the main wrapper div to block actions beneath it so we turn
  // off pointer events for it but turn them back on for all the children
  pointerEvents: "none",
  "&>*": {
    pointerEvents: "all",
  },
  ...placeOnGridOrCol({ dir, index }),
  ...(dir === "rows" ? rowGutterStyles : colGutterStyles),
}));
