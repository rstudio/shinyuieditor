import styled from "@emotion/styled";
import { makeBoxShadow } from "utils/css-helpers";

export const UiPanelHolder = styled.div(({ area }: { area: string }) => ({
  display: "grid",
  gridArea: area,
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr",
  width: "100%",
  height: "100%",
  placeItems: "center",
  position: "relative",
  boxShadow: makeBoxShadow({ height: 0.2 }),
}));
