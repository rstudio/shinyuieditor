/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { GridLocString } from "GridTypes";
import React from "react";
import { useShowDiffs } from "state-logic/useShowChanges";
import { subtractElements } from "utils/array-helpers";
import addItem from "utils/gridTemplates/addItem";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import { ItemBoundingBox } from "utils/overlap-helpers";
import { GridCells } from "./GridCell";
import { TractControls } from "./TractControls";

export type GridEditorProps = TemplatedGridProps & {
  items: Record<string, JSX.Element>;
};

export type CellLocRef = React.MutableRefObject<
  Record<GridLocString, ItemBoundingBox>
>;

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

  const addNewItem = ({ row, col }: { row: number; col: number }) => {
    const newAreaName = `row${row}-col${col}`;
    setLayout((layout) =>
      addItem(layout, {
        name: newAreaName,
        rowStart: row,
        colStart: col,
        rowSpan: 1,
        colSpan: 1,
      })
    );
    onNewArea({ area: newAreaName });
  };

  useShowDiffs({ val: layout });

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

  const areaMarkers = areasWithoutItems.map((area) => (
    <AreaMarker key={area} style={{ gridArea: area }}>
      area: {area}
    </AreaMarker>
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
          {areaMarkers}
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

const AreaMarker = styled.div({
  outline: "1px solid black",
  display: "grid",
  placeContent: "end",
  fontWeight: "lighter",
  fontStyle: "italic",
  padding: "2px",
  // I have no idea why I need to specify a z-index here to get this to sit
  // over the grid cell
  zIndex: 1,
  backgroundColor: "var(--light-grey)",
});
