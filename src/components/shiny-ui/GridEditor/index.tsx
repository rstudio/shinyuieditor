/** @jsxImportSource @emotion/react */
import { Button } from "@chakra-ui/button";
import styled from "@emotion/styled";
import { GridLocString } from "GridTypes";
import React from "react";
import { useShowDiffs } from "state-logic/useShowChanges";
import { subtractElements } from "utils/array-helpers";
import addItem from "utils/gridTemplates/addItem";
import { areasToItemLocations } from "utils/gridTemplates/itemLocations";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import { ItemBoundingBox } from "utils/overlap-helpers";
import { AreaOverlay } from "./AreaOverlay";
import { GridCells } from "./GridCell";
import { gridExtentToLocation } from "./helpers";
import { TractControls } from "./TractControls";

export type GridEditorProps = TemplatedGridProps & {
  items: Record<string, JSX.Element>;
};

export type GridCellBounds = Record<GridLocString, ItemBoundingBox>;
export type CellLocRef = React.MutableRefObject<GridCellBounds>;

export const SetLayoutContext = React.createContext<React.Dispatch<
  React.SetStateAction<TemplatedGridProps>
> | null>(null);

type EditMode = "UI" | "Layout";
export default function GridEditor({
  items,
  onNewArea,
  ...initialLayoutDef
}: GridEditorProps & {
  onNewArea: (opts: { area: string }) => void;
}) {
  const [layout, setLayout] = React.useState<TemplatedGridProps>({
    gapSize: "1rem",
    ...initialLayoutDef,
  });

  const [editMode, setEditMode] = React.useState<EditMode>("UI");

  const itemGridLocations = React.useMemo(
    () => areasToItemLocations(layout.areas),
    [layout.areas]
  );

  const setItem = (itemInfo: Parameters<typeof addItem>[1]) => {
    setLayout((layout) => addItem(layout, itemInfo));
  };

  const addNewItem = ({ row, col }: { row: number; col: number }) => {
    const newAreaName = `row${row}-col${col}`;

    setItem({
      name: newAreaName,
      rowStart: row,
      colStart: col,
      rowSpan: 1,
      colSpan: 1,
    });
    onNewArea({ area: newAreaName });
  };

  const {
    numRows,
    numCols,
    styles,
    uniqueAreas,
    sizes,
  } = parseGridTemplateAreas(layout);

  const itemAreas = Object.keys(items);
  const areasWithoutItems = subtractElements(uniqueAreas, itemAreas);

  const gridCellLocations: CellLocRef = React.useRef({});

  const areaOverlays = itemAreas.map((area) => (
    <AreaOverlay
      key={area}
      area={area}
      areas={layout.areas}
      cellLocRef={gridCellLocations}
      gridLocation={itemGridLocations.get(area)}
      onNewPos={(updatedPos) =>
        setItem({
          name: area,
          ...gridExtentToLocation(updatedPos),
        })
      }
    />
  ));

  return (
    <SetLayoutContext.Provider value={setLayout}>
      <div
        css={{
          "--gap": layout.gapSize,
          "--settings-bar": "50px",
          "--row-gutter": "150px",
          "--col-gutter": "100px",
          display: "grid",
          gridTemplateColumns: "var(--row-gutter) 1fr",
          gridTemplateRows: "var(--settings-bar) var(--col-gutter) 1fr",
          gridTemplateAreas: `"           settings settings"\n
                              "           . column-controls"\n
                              "row-controls main"`,
        }}
      >
        <SettingsBar>
          <EditModeToggle selected={editMode} onSelect={setEditMode} />
        </SettingsBar>
        <GridDisplay style={styles}>
          <TractControls areas={layout.areas} sizes={sizes} />
          <GridCells
            numCols={numCols}
            numRows={numRows}
            cellLocRef={gridCellLocations}
            onClick={addNewItem}
          />
          {editMode === "Layout" ? areaOverlays : null}
          {Object.values(items)}
        </GridDisplay>
      </div>
    </SetLayoutContext.Provider>
  );
}

function EditModeToggle({ selected, onSelect }: { selected: EditMode; onSelect: (selection: EditMode) => void; }) {
  return <ToggleButtons className={selected === "UI" ? "left-selected" : "right-selected"}>
    <button name="UI" className="left" onClick={() => onSelect("UI")}>UI</button>
    <button name="Layout" className="right" onClick={() => onSelect("Layout")}>Layout</button>
  </ToggleButtons>
}

const GridDisplay = styled.div({
  gridArea: "main",
  gridRow: 3,
  gridColumn: 2,
  display: "grid",
});

const SettingsBar = styled.div({
  gridArea: "settings",
  display: "grid",
});

const ToggleButtons = styled.div({
  "--roundness": "8px",
  "--w": "70px",
  "--h": "40px",
  "--bar-transform": "var(--roundness)",
  "--color-bar": "var(--rstudio-blue, forestgreen)",
  "--color-selected": "var(--rstudio-blue, forestgreen)",
  "--color-selected-text": "var(--rstudio-white, blue)",
  "--color-border": "var(--light-grey, red)",
  "position": "relative",
  width: "calc(2*var(--w))",
  height: "var(--h)",
  "& > button": {
    padding: "5px 10px",
    width: "var(--w)",
    transition: "borderColor borderWidth 0.2s ease-in",
    backgroundColor: "var(--light-grey)",
    color: "#303030",
  },
  "& > button.left": {
    borderTopLeftRadius: "var(--roundness)",
    borderBottomLeftRadius: "var(--roundness)",
  },
  "&.left-selected > button.left": {
    backgroundColor: "var(--color-selected)",
    color: "var(--color-selected-text)",
  },
  "&.right-selected > button.right": {
    backgroundColor: "var(--color-selected)",
    color: "var(--color-selected-text)",
  },
  "& > button.right": {
    borderTopRightRadius: "var(--roundness)",
    borderBottomRightRadius: "var(--roundness)",
  },
  "&.right-selected": {
    "--bar-transform": "var(--w)",
  },
  "&::after": {
    content: `""`,
    position: "absolute",
    bottom: "2px",
    height: "3px",
    left: 0,
    transform: "translateX(var(--bar-transform))",
    width: "calc(var(--w) - var(--roundness))",
    backgroundColor: "var(--color-bar)",
    transition: "transform 0.1s ease-in",
  },
})