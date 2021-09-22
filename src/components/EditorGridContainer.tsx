/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { gridItemAtoms, gridItemNames } from "../state-logic/gridItems";
import EditableGridItem from "./EditableGridItem";
import GridTractControls from "./GridTractControls";

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
  // Setup the new-item drag behavior
  // const onMouseDown = useGridDragger();
  const itemNames = useRecoilValue(gridItemNames);

  return (
    <MainGridContainer>
      {itemNames.map((name) => (
        <EditableGridItem
          key={name}
          name={name}
          itemDefState={gridItemAtoms(name)}
        />
      ))}
      <GridTractControls />

      {/* <div onMouseDown={onMouseDown} className={classes.newItemDragDetector} /> */}
      {/* 
      <SelectedItemOverlay />
      <DragFeedback /> */}
    </MainGridContainer>
  );
}
