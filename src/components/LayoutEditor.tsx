/** @jsxImportSource @emotion/react */
import { StackDivider, VStack } from "@chakra-ui/react";
import * as React from "react";
import { useSetRecoilState } from "recoil";
import layouts from "../assets/layouts";
import { fullAppState } from "../state-logic/gridLayout/atoms";
import { CSSUnitInput } from "./CSSUnitInput";
import { EditorInstructions } from "./EditorInstructions";
import { EditorSettings, SettingPane } from "./EditorSettings";
import { MainGridCSSVariables } from "./MainGridCSSVariables";
export function LayoutEditor() {
  const setUpNewLayout = useSetRecoilState(fullAppState);

  React.useEffect(() => {
    setUpNewLayout(layouts[0]);
  }, [setUpNewLayout]);
  return (
    <div
      css={{
        "--main-gap": "var(--pad, 1rem)",
        "--row-controls-gap":
          "calc(var(--unit-input-width, 30px) - var(--main-gap))",
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
      }}
    >
      <EditorSettings>
        <MainGridCSSVariables />
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <SettingPane label="Grid Gap">
            <CSSUnitInput value={3} />
          </SettingPane>
        </VStack>
      </EditorSettings>
      <EditorInstructions />
    </div>
  );
}
