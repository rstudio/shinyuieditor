/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as React from "react";
import { useSetRecoilState } from "recoil";
import layouts from "../assets/layouts";
import { gridItemNames, useDeleteItem } from "../state-logic/gridItems";
import { fullAppState } from "../state-logic/gridLayout/atoms";
import { CSSUnitInput } from "./CSSUnitInput";
import { EditorInstructions } from "./EditorInstructions";
import { EditorItemsListView } from "./EditorItemsListView";
import { EditorSettings, SettingPane } from "./EditorSettings";
import { FakeBrowserBar } from "./FakeBrowserBar";
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
  const setUpNewLayout = useSetRecoilState(fullAppState);
  const deleteItem = useDeleteItem();

  React.useEffect(() => {
    setUpNewLayout(layouts[0]);
  }, [setUpNewLayout]);

  return (
    <EditorWrapper>
      <MainGridCSSVariables />
      <GridCard title="Settings" icon="settings" gridArea="settings">
        <EditorSettings>
          <SettingPane label="Grid Gap">
            <CSSUnitInput value={"3px"} onChange={console.log} />
          </SettingPane>
        </EditorSettings>
      </GridCard>
      <GridCard
        title="Instructions"
        icon="instructions"
        gridArea="instructions"
      >
        <EditorInstructions />
      </GridCard>
      <GridCard title="Items" icon="items" gridArea="items">
        <EditorItemsListView
          itemNamesAtom={gridItemNames}
          deleteItem={deleteItem}
        />
      </GridCard>
      <GridCard gridArea="editor" header={<FakeBrowserBar />}>
        Test
      </GridCard>
    </EditorWrapper>
  );
}
