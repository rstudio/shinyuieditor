/** @jsxImportSource @emotion/react */
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
          "--row-gutter": "150px",
          "--col-gutter": "100px",
          display: "grid",
          gridTemplateColumns: "var(--row-gutter) 1fr",
          gridTemplateRows: "var(--col-gutter) 1fr",
          gridTemplateAreas: `". column-controls"\n"row-controls main"`,
        }}
      >
        <GridDisplay style={styles}>
          <TractControls areas={layout.areas} sizes={sizes} />
          <GridCells
            numCols={numCols}
            numRows={numRows}
            cellLocRef={gridCellLocations}
            onClick={addNewItem}
          />
          {areaOverlays}
          {Object.values(items)}
        </GridDisplay>
      </div>
    </SetLayoutContext.Provider>
  );
}

const GridDisplay = styled.div({
  gridArea: "main",
  gridRow: 2,
  gridColumn: 2,
  display: "grid",
});
