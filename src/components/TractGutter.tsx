import styled from "@emotion/styled";
import { placeOnGridOrCol } from "../grid-helpers";
import { TractPosition } from "../state-logic/gridLayout/atoms";

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
  ...placeOnGridOrCol({ dir, index }),
  ...(dir === "rows" ? rowGutterStyles : colGutterStyles),
}));
