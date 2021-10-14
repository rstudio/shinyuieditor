/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { DragFeedback } from "components/DragFeedback";
import { EditorSettings, SettingPane } from "components/EditorSettings";
import { FakeBrowserBar } from "components/FakeBrowserBar";
import { GapSizeChooser } from "components/GapSizeChooser";
import { GridCard } from "components/GridCard";
import ItemsGridView from "components/ItemsGridView";
import { ItemsListView } from "components/ItemsListView";
import { MainGridCSSVariables } from "components/MainGridCSSVariables";
import { SelectedItemOverlay } from "components/SelectedItemOverlay";
import { TractAddButtons } from "components/TractAddButtons";
import { TractBoundaryLines } from "components/TractBoundaryLines";
import { TractControls } from "components/TractControls";
import * as React from "react";
import { FaListUl } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { useInitializeToLayout } from "state-logic/gridLayout/hooks";
import { EditorInstructions } from "views/EditorInstructions";

export function LayoutEditor() {
  useInitializeToLayout("default");
  return (
    <EditorWrapper>
      <MainGridCSSVariables />
      <GridCard title="Settings" icon={<FiSettings />} area="settings">
        <EditorSettings>
          <SettingPane label="Grid Gap">
            <GapSizeChooser />
          </SettingPane>
        </EditorSettings>
      </GridCard>
      <GridCard title="Instructions" icon={<FaListUl />} area="instructions">
        <EditorInstructions />
      </GridCard>
      <GridCard title="Items" icon={<ImStack />} area="items">
        <ItemsListView />
      </GridCard>
      <GridCard
        area="editor"
        header={<FakeBrowserBar />}
        padding="0px"
        overloadStyles={{ overflow: "visible" }} // needed to keep the tract controls visible
      >
        <MainGridContainer aria-label="grid-view">
          <DragFeedback />
          <TractAddButtons dir="rows" />
          <TractAddButtons dir="cols" />
          <TractControls dir="rows" />
          <TractControls dir="cols" />
          <TractBoundaryLines dir="rows" />
          <TractBoundaryLines dir="cols" />
          <ItemsGridView />
          <SelectedItemOverlay />
        </MainGridContainer>
      </GridCard>
    </EditorWrapper>
  );
}

const EditorWrapper = styled.div({
  "--main-gap": "var(--pad, 1rem)",
  "--row-controls-gap": "calc(var(--unit-input-width, 30px) - var(--main-gap))",
  "--col-controls-gap": "calc(50px - var(--main-gap))",
  display: "grid",
  // min and max height are needed here or else the app will want to overflow
  // the viewport in an attempt to fit all the content of a long card like the
  // instructions panel.
  minHeight: "100%",
  maxHeight: "100%",
  gridTemplateColumns: "300px var(--row-controls-gap) 1fr",
  gridTemplateRows: "var(--col-controls-gap) auto 1fr auto",
  gap: "var(--main-gap)",
  padding: "var(--main-gap)",
  gridTemplateAreas: `
      "settings      .   .   "
      "settings      . editor"
      "instructions  . editor"
      "items         . editor"
    `,
});

const MainGridContainer = styled.div({
  display: "grid",
  height: "100%",
  position: "relative",
  gridTemplateColumns: "var(--main-grid-columns)",
  gridTemplateRows: "var(--main-grid-rows)",
  gap: "var(--main-grid-gap)",
  padding: "var(--main-grid-gap)",
});
