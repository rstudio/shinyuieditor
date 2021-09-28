/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as React from "react";
import { FaListUl } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { useInitializeToLayout } from "../state-logic/gridLayout/hooks";
import { EditorGridContainer } from "./EditorGridContainer";
import { EditorInstructions } from "./EditorInstructions";
import { EditorItemsListView } from "./EditorItemsListView";
import { EditorSettings, SettingPane } from "./EditorSettings";
import { FakeBrowserBar } from "./FakeBrowserBar";
import { GapSizeChooser } from "./GapSizeChooser";
import { GridCard } from "./GridCard";
import { MainGridCSSVariables } from "./MainGridCSSVariables";

const EditorWrapper = styled.div({
  "--main-gap": "var(--pad, 1rem)",
  "--row-controls-gap": "calc(var(--unit-input-width, 30px) - var(--main-gap))",
  "--col-controls-gap": "calc(50px - var(--main-gap))",
  display: "grid",
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
        <EditorItemsListView />
      </GridCard>
      <GridCard area="editor" header={<FakeBrowserBar />} padding="0px">
        <EditorGridContainer />
      </GridCard>
    </EditorWrapper>
  );
}
