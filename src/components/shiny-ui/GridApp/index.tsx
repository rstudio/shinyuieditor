/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { CSSMeasure, GridLocString } from "GridTypes";
import omit from "just-omit";
import * as React from "react";
import addItem from "utils/gridTemplates/addItem";
import addTract from "utils/gridTemplates/addTract";
import { areasToItemLocations } from "utils/gridTemplates/itemLocations";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import removeItem from "utils/gridTemplates/removeItem";
import removeTract from "utils/gridTemplates/removeTract";
import resizeTract from "utils/gridTemplates/resizeTract";
import { GridItemExtent, TemplatedGridProps } from "utils/gridTemplates/types";
import { ItemBoundingBox } from "utils/overlap-helpers";
import { ShinyUiNameAndProps } from "../componentTypes";
import UiChooser from "../UiChooser";
import UiPanel from "../UiPanel";
import { AreaOverlay } from "./AreaOverlay";
import { EditModeToggle } from "./EditModeToggle";
import { GridCells } from "./GridCell";
import { TractDirection } from "./helpers";
import { TractControls } from "./TractControls";

export type Panels = Record<string, ShinyUiNameAndProps>;
type GridAppProps = {
  layout: TemplatedGridProps;
  panels: Panels;
  onNewState?: (x: Panels) => void;
};
export type GridCellBounds = Record<GridLocString, ItemBoundingBox>;
export type CellLocRef = React.MutableRefObject<GridCellBounds>;
export type EditMode = "UI" | "Layout";

export const LayoutDispatchContext =
  React.createContext<React.Dispatch<GridLayoutAction> | null>(null);

type GridLayoutAction =
  | { type: "ADD_ITEM" }
  | { type: "REMOVE_ITEM"; name: string }
  | { type: "MOVE_ITEM"; name: string; pos: GridItemExtent }
  | {
      type: "ADD_TRACT";
      dir: TractDirection;
      afterIndex: number;
      size: CSSMeasure;
    }
  | {
      type: "REMOVE_TRACT";
      dir: TractDirection;
      index: number;
    }
  | {
      type: "RESIZE_TRACT";
      dir: TractDirection;
      index: number;
      size: CSSMeasure;
    };

function gridLayoutReducer(
  layout: TemplatedGridProps,
  action: GridLayoutAction
): TemplatedGridProps {
  switch (action.type) {
    case "ADD_ITEM":
      console.error("Yet to implement ADD_ITEM");
      return layout;
    case "REMOVE_ITEM":
      return removeItem(layout, action.name);
    case "MOVE_ITEM":
      return addItem(layout, { name: action.name, ...action.pos });
    case "ADD_TRACT":
      return addTract(layout, action);
    case "REMOVE_TRACT":
      return removeTract(layout, action);
    case "RESIZE_TRACT":
      return resizeTract(
        layout,
        { dir: action.dir, index: action.index },
        action.size
      );
    default:
      console.error(action);
      throw new Error("Have yet to implement layout action type");
  }
}

export default function GridApp({
  layout: initialLayout,
  panels: initialPanels,
  onNewState,
}: GridAppProps) {
  const [allPanels, setAllPanels] = React.useState(initialPanels);
  const [layout, layoutDispatch] = React.useReducer(gridLayoutReducer, {
    gapSize: "1rem",
    ...initialLayout,
  } as TemplatedGridProps);
  const [editMode, setEditMode] = React.useState<EditMode>("UI");
  const gridCellLocations: CellLocRef = React.useRef({});

  // Can probably be memoized
  const { numRows, numCols, styles, sizes, uniqueAreas } =
    parseGridTemplateAreas(layout);

  const itemGridLocations = React.useMemo(
    () => areasToItemLocations(layout.areas),
    [layout.areas]
  );

  const onNewItem = ({ row, col }: { row: number; col: number }) => {
    const newAreaName = `row${row}-col${col}`;
    console.log("Building a new item...", newAreaName);
    // onNewArea({
    //   name: newAreaName,
    //   rowStart: row,
    //   colStart: col,
    //   rowSpan: 1,
    //   colSpan: 1,
    // });
  };

  React.useEffect(() => onNewState?.(allPanels), [allPanels, onNewState]);

  const updatePanel = React.useCallback(
    (panelArea: string, newProps: object) => {
      setAllPanels((currentPanels) => {
        const existingPanel = currentPanels[panelArea];
        if (!existingPanel) throw new Error("That panel doesn't exist");
        const newPanels = { ...currentPanels };

        // This needs some better typing so we know newProps will be the proper
        // type for the given existingPanel name
        newPanels[panelArea] = {
          componentName: existingPanel.componentName,
          componentProps: newProps,
        } as ShinyUiNameAndProps;
        return newPanels;
      });
    },
    [setAllPanels]
  );

  const deletePanel = React.useCallback(
    (area: string) => {
      layoutDispatch({ type: "REMOVE_ITEM", name: area });
      setAllPanels((panels) => omit(panels, area));
    },
    [setAllPanels]
  );

  const addPanel = React.useCallback(
    (area: string, newPanel: ShinyUiNameAndProps) => {
      setAllPanels((panels) => ({ ...panels, [area]: newPanel }));
    },
    [setAllPanels]
  );

  const moveItem = React.useCallback((name: string, pos: GridItemExtent) => {
    layoutDispatch({ type: "MOVE_ITEM", name, pos });
  }, []);

  const panelAreas = Object.keys(allPanels);

  if (panelAreas.some((area) => !uniqueAreas.includes(area)))
    throw new Error(
      "Tried to place a panel onto an area not in the defined grid layout"
    );

  const areaOverlays = uniqueAreas.map((area) => (
    <AreaOverlay
      key={area}
      area={area}
      areas={layout.areas}
      cellLocRef={gridCellLocations}
      gridLocation={itemGridLocations.get(area)}
      onNewPos={(pos) => moveItem(area, pos)}
    />
  ));

  const gridItems = panelAreas.map((area) => (
    <UiPanel
      key={area}
      area={area}
      componentDefinition={allPanels[area]}
      onUpdate={(newProps) => updatePanel(area, newProps)}
      onDelete={() => deletePanel(area)}
    />
  ));

  // If we have any unset panels, give then the ui chooser interface and add to the grid items children
  uniqueAreas.forEach((area) => {
    if (area in allPanels) return;
    gridItems.push(
      <UiChooser key={area} area={area} onChoose={(x) => addPanel(area, x)} />
    );
  });

  return (
    <LayoutDispatchContext.Provider value={layoutDispatch}>
      <AppContainer gapSize={layout.gapSize}>
        <SettingsBar>
          <EditModeToggle selected={editMode} onSelect={setEditMode} />
        </SettingsBar>
        <GridDisplay style={styles}>
          <TractControls areas={layout.areas} sizes={sizes} />
          <GridCells
            numCols={numCols}
            numRows={numRows}
            cellLocRef={gridCellLocations}
            onClick={onNewItem}
          />
          {editMode === "Layout" ? areaOverlays : null}
          {gridItems}
        </GridDisplay>
      </AppContainer>
    </LayoutDispatchContext.Provider>
  );
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
  justifyContent: "end",
});
