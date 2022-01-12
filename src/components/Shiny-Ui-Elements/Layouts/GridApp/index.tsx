/** @jsxImportSource @emotion/react */

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { CSSUnitInput } from "components/CSSUnitInput";
import ConfigureNewUiElement from "components/Shiny-Ui-Elements/ConfigureNewUiElement";
import { GridLocString } from "GridTypes";
import omit from "just-omit";
import * as React from "react";
import { areasToItemLocations } from "utils/gridTemplates/itemLocations";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import { GridItemExtent, TemplatedGridProps } from "utils/gridTemplates/types";
import { ItemBoundingBox } from "utils/overlap-helpers";
import { ShinyUiNameAndArguments } from "../../Elements/componentTypes";
import UiPanel from "../../UiPanel";
import { AreaOverlay } from "./AreaOverlay";
import { EditModeToggle } from "./EditModeToggle";
import { GridCells } from "./GridCell";
import { TractControls } from "./TractControls";
import { GridLayoutAction, useGridLayoutReducer } from "./useGridLayoutReducer";

export type Panels = Record<string, ShinyUiNameAndArguments>;
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

export default function GridApp({
  layout: initialLayout,
  panels: initialPanels,
  onNewState,
}: GridAppProps) {
  const [allPanels, setAllPanels] = React.useState(initialPanels);
  const { layout, layoutDispatch, addItem, moveItem, removeItem } =
    useGridLayoutReducer(initialLayout);

  const [editMode, setEditMode] = React.useState<EditMode>("UI");

  const [newPanelPosition, setNewPanelPosition] =
    React.useState<GridItemExtent | null>(null);

  const fullState: StateDump = {
    layout: { type: "gridlayout", options: layout },
    elements: allPanels,
  };

  const closeNewPanelModal = () => setNewPanelPosition(null);

  const gridCellLocations: CellLocRef = React.useRef({});

  // Can probably be memoized
  const { numRows, numCols, styles, sizes, uniqueAreas } =
    parseGridTemplateAreas(layout);

  const itemGridLocations = React.useMemo(
    () => areasToItemLocations(layout.areas),
    [layout.areas]
  );

  const onNewItem = ({ row, col }: { row: number; col: number }) => {
    setNewPanelPosition({
      rowStart: row,
      rowEnd: row,
      colStart: col,
      colEnd: col,
    });
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
          uiName: existingPanel.uiName,
          uiArguments: newProps,
        } as ShinyUiNameAndArguments;
        return newPanels;
      });
    },
    [setAllPanels]
  );

  const deletePanel = React.useCallback(
    (area: string) => {
      removeItem(area);
      setAllPanels((panels) => omit(panels, area));
    },
    [removeItem]
  );

  const addPanel = React.useCallback(
    (area: string, pos: GridItemExtent, newPanel: ShinyUiNameAndArguments) => {
      setAllPanels((panels) => ({ ...panels, [area]: newPanel }));
      addItem(area, pos);
    },
    [addItem]
  );

  const panelAreas = Object.keys(allPanels);

  if (panelAreas.some((area) => !uniqueAreas.includes(area)))
    throw new Error(
      "Tried to place a panel onto an area not in the defined grid layout"
    );

  const areaOverlays =
    editMode === "Layout"
      ? uniqueAreas.map((area) => (
          <AreaOverlay
            key={area}
            area={area}
            areas={layout.areas}
            cellLocRef={gridCellLocations}
            gridLocation={itemGridLocations.get(area)}
            onNewPos={(pos) => moveItem(area, pos)}
          />
        ))
      : null;

  const gridItems = panelAreas.map((area) => (
    <UiPanel
      key={area}
      area={area}
      componentDefinition={allPanels[area]}
      onUpdate={(newProps) => updatePanel(area, newProps)}
      onDelete={() => deletePanel(area)}
    />
  ));

  return (
    <LayoutDispatchContext.Provider value={layoutDispatch}>
      <AppContainer gapSize={layout.gapSize}>
        <SettingsBar>
          <h1>Layout settings</h1>
          <div>
            <div className="label">Gap Size:</div>
            <CSSUnitInput
              value={layout.gapSize ?? "2rem"}
              units={["px", "rem"]}
              w="130px"
              onChange={(x) => layoutDispatch({ type: "SET_GAP", size: x })}
            />
          </div>
          <div>
            <div className="label">Edit Mode:</div>
            <EditModeToggle selected={editMode} onSelect={setEditMode} />
          </div>
          <Button
            bg="var(--rstudio-blue)"
            color="var(--rstudio-white)"
            onClick={() => sendUiStateToBackend(fullState)}
          >
            Send state to backend
          </Button>
        </SettingsBar>
        <GridDisplay style={styles}>
          <TractControls areas={layout.areas} sizes={sizes} />
          <GridCells
            numCols={numCols}
            numRows={numRows}
            cellLocRef={gridCellLocations}
            onClick={onNewItem}
          />
          {areaOverlays}
          {gridItems}
        </GridDisplay>
      </AppContainer>

      <Modal
        isOpen={newPanelPosition !== null}
        onClose={closeNewPanelModal}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configure Ui Element</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ConfigureNewUiElement
              onFinish={({ name, ui }) => {
                if (!newPanelPosition)
                  throw new Error(
                    "Somehow we have no position for the newly configured item..."
                  );

                addPanel(name, newPanelPosition, ui);
                closeNewPanelModal();
              }}
              onCancel={closeNewPanelModal}
              existingElementNames={Object.keys(allPanels)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </LayoutDispatchContext.Provider>
  );
}

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
