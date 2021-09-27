/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { gridItemAtoms, gridItemNames } from "../state-logic/gridItems";
import { DragFeedbackRect } from "./DragFeedbackRect";
import { DragWatcher } from "./DragWatcher";
import EditableGridItem from "./EditableGridItem";
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
  const itemNames = useRecoilValue(gridItemNames);

  return (
    <MainGridContainer>
      <DragWatcher />

      <TractAddButtons dir="rows" />
      <TractAddButtons dir="cols" />
      <TractSizers dir="rows" />
      <TractSizers dir="cols" />
      <TractBoundaryLines dir="rows" />
      <TractBoundaryLines dir="cols" />
      {itemNames.map((name) => (
        <EditableGridItem
          key={name}
          name={name}
          itemDefState={gridItemAtoms(name)}
        />
      ))}
      <SelectedItemOverlay />
      <DragFeedbackRect />
    </MainGridContainer>
  );
}
