/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { GridLocString } from "GridTypes";
import React from "react";
import { subtractElements } from "utils/array-helpers";
import { enumerateGridDims, toStringLoc } from "utils/grid-helpers";
import { ItemBoundingBox } from "utils/overlap-helpers";
import parseGridTemplateAreas, {
  TemplatedGridProps,
} from "utils/parseGridTemplateAreas";
import { GridCell } from "./GridCell";

export type GridEditorProps = TemplatedGridProps & {
  items: Record<string, JSX.Element>;
};

export type CellLocRef = React.MutableRefObject<
  Record<GridLocString, ItemBoundingBox>
>;

export default function GridEditor({
  items,
  ...initialLayoutDef
}: GridEditorProps) {
  const { numRows, numCols, styles, uniqueAreas } = parseGridTemplateAreas(
    initialLayoutDef
  );

  const itemAreas = Object.keys(items);
  const areasWithoutItems = subtractElements(uniqueAreas, itemAreas);

  const gridCellLocations: CellLocRef = React.useRef({});

  const areaMarkers = areasWithoutItems.map((area) => (
    <AreaMarker key={area} style={{ gridArea: area }}>
      area: {area}
    </AreaMarker>
  ));

  const backgroundCells = enumerateGridDims({
    numRows,
    numCols,
  }).map(({ row, col }) => (
    <GridCell
      key={toStringLoc({ row, col })}
      gridRow={row}
      gridColumn={col}
      cellLocations={gridCellLocations}
    />
  ));

  React.useEffect(() => {
    const cellLocs = gridCellLocations.current;
    console.log("Cell locations at load", cellLocs);
  }, []);

  return (
    <EditorHolder>
      <GridDisplay style={styles}>
        {Object.values(items)}
        {areaMarkers}
        {backgroundCells}
      </GridDisplay>
    </EditorHolder>
  );
}

const EditorHolder = styled.div({
  display: "grid",
  gridTemplateColumns: "100px 1fr",
  gridTemplateRows: "100px 1fr",
  gridTemplateAreas: `".            column-controls"\n"row-controls main"`,
});

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
  opacity: 0.2,
});
