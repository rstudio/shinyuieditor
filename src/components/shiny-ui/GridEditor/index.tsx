/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { GridLocString } from "GridTypes";
import React from "react";
import { subtractElements } from "utils/array-helpers";
import { addTract, NewTract } from "utils/gridTemplates/addTract";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import { ItemBoundingBox } from "utils/overlap-helpers";
import { GridCells } from "./GridCell";
import { TractAddButtons } from "./TractAddButtons";

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
  const [layout, setLayout] = React.useState(initialLayoutDef);

  const onAddTract = React.useCallback(
    (tract: NewTract) => setLayout((oldLayout) => addTract(oldLayout, tract)),
    []
  );

  const { numRows, numCols, styles, uniqueAreas } = parseGridTemplateAreas(
    layout
  );

  const itemAreas = Object.keys(items);
  const areasWithoutItems = subtractElements(uniqueAreas, itemAreas);

  const gridCellLocations: CellLocRef = React.useRef({});

  const areaMarkers = areasWithoutItems.map((area) => (
    <AreaMarker key={area} style={{ gridArea: area }}>
      area: {area}
    </AreaMarker>
  ));

  return (
    <EditorHolder>
      <GridDisplay style={styles}>
        {Object.values(items)}
        {areaMarkers}
        <GridCells
          numCols={numCols}
          numRows={numRows}
          cellLocRef={gridCellLocations}
        />
        <TractAddButtons
          numCols={numCols}
          numRows={numRows}
          onAdd={onAddTract}
        />
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
