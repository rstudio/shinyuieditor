/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { DragFeedback } from "components/DragFeedback";
import ItemsGridView from "components/ItemsGridView";
import { SelectedItemOverlay } from "components/SelectedItemOverlay";
import { TractAddButtons } from "components/TractAddButtons";
import { TractBoundaryLines } from "components/TractBoundaryLines";
import { TractSizers } from "components/TractSizers";
import * as React from "react";

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
