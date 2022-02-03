/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { GridLocString } from "GridTypes";
import * as React from "react";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import { ItemBoundingBox } from "utils/overlap-helpers";
import { UiNodeProps } from "../../uiNodeTypes";
import { GridLayoutAction } from "./useGridLayoutReducer";

export type Panels = Record<string, UiNodeProps>;
type GridAppProps = {
  layout: TemplatedGridProps;
  panels: Panels;
  onNewState?: (x: Panels) => void;
};
export type GridCellBounds = Record<GridLocString, ItemBoundingBox>;
export type CellLocRef = React.MutableRefObject<GridCellBounds>;
export type EditMode = "UI" | "Layout";
type StateDump = {
  layout: { type: "gridlayout"; options: TemplatedGridProps };
  elements: Panels;
};
export const LayoutDispatchContext =
  React.createContext<React.Dispatch<GridLayoutAction> | null>(null);

function sendUiStateToBackend(state: StateDump) {
  const stateBlob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });

  fetch("UiDump", { method: "POST", body: stateBlob })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(function (response) {
      console.log("Response after sending state blob", response);
    });
}

const AppContainer = styled.div(({ gapSize }: { gapSize: string }) => ({
  "--gap": gapSize,
  "--settings-bar": "50px",
  "--row-gutter": "150px",
  "--col-gutter": "100px",
  height: "100%",
  display: "grid",
  gridTemplateColumns: "var(--row-gutter) 1fr",
  gridTemplateRows: "var(--settings-bar) var(--col-gutter) 1fr",
  gridTemplateAreas: `"           settings settings"\n
                      "           . column-controls"\n
                      "row-controls main"`,
}));

const GridDisplay = styled.div({
  gridArea: "main",
  gridRow: 3,
  gridColumn: 2,
  display: "grid",
});

const SettingsBar = styled.div({
  gridArea: "settings",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  paddingBottom: "0.5rem",
  borderBottom: "2px solid var(--light-grey)",
  "& > h1": {
    fontSize: "1.5rem",
  },
  "& > div": {
    display: "flex",
    alignItems: "center",
    gap: "3px",
    ".label": { fontWeight: 300 },
  },
});
