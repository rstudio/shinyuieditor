/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as React from "react";
import { DragFeedback } from "./DragFeedback";
import ItemsGridView from "./ItemsGridView";
import { SelectedItemOverlay } from "./SelectedItemOverlay";
import { TractAddButtons } from "./TractAddButtons";
import { TractBoundaryLines } from "./TractBoundaryLines";
import { TractSizers } from "./TractSizers";

const MainGridContainer = styled.div({
  display: "grid",
  height: "100%",
  position: "relative",
  gridTemplateColumns: "var(--main-grid-columns)",
  gridTemplateRows: "var(--main-grid-rows)",
  gap: "var(--main-grid-gap)",
  padding: "var(--main-grid-gap)",
});

// A grid container that also displays a grid of all cells in background
export function EditorGridContainer() {
  return (
    <MainGridContainer aria-label="grid-view">
      <DragFeedback />
      <TractAddButtons dir="rows" />
      <TractAddButtons dir="cols" />
      <TractSizers dir="rows" />
      <TractSizers dir="cols" />
      <TractBoundaryLines dir="rows" />
      <TractBoundaryLines dir="cols" />
      <ItemsGridView />
      <SelectedItemOverlay />
    </MainGridContainer>
  );
}
