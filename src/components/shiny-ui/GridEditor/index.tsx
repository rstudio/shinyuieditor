/** @jsxImportSource @emotion/react */
import debounce from "just-debounce-it";
import React from "react";
import { subtractElements } from "utils/array-helpers";
import { enumerateGridDims } from "utils/grid-helpers";
import { getBBoxOfDiv, ItemBoundingBox } from "utils/overlap-helpers";
import parseGridTemplateAreas, {
  TemplatedGridProps
} from "utils/parseGridTemplateAreas";

export type GridEditorProps = TemplatedGridProps & {
  items: Record<string, JSX.Element>;
  
};

// prettier-ignore
type GridStringLoc= `row${number}-col${number}`;

type CellLocRef = React.MutableRefObject<
  Record<GridStringLoc, ItemBoundingBox>
>;

export default function GridEditor({ items, ...layoutDef }: GridEditorProps) {
  const { numRows, numCols, styles, uniqueAreas } = parseGridTemplateAreas(
    
    layoutDef
  );

  const itemAreas = Object.keys(items);
  const areasWithoutItems = subtractElements(uniqueAreas, itemAreas);

  const gridCellLocations: CellLocRef = React.useRef({});

  const areaMarkers = areasWithoutItems.map((area) => (
    <div
      key={area}
      css={{
        outline: "1px solid black",
        display: "grid",
        placeContent: "end",
        fontWeight: "lighter",
        fontStyle: "italic",
        padding: "2px",
        opacity: 0.2,
      }}
      style={{ gridArea: area }}
    >
      area: {area}
    </div>
  ));

  const backgroundCells = enumerateGridDims({ numRows, numCols }).map(
    ({ row, col }) => (
      <GridCell key={toStringLoc({row,col})}gridRow={row} gridColumn={col} cellLocations={gridCellLocations}/>
    )
  );

  React.useEffect(() => {


    const cellLocs = gridCellLocations.current;
    console.log("Cell locations at load", cellLocs);
  },[])

  return (
    <div style={styles} css={{ display: "grid" }}>
      {Object.values(items)}
      {areaMarkers}
      {backgroundCells}
    </div>
  );
}

function toStringLoc({row, col}: {row:number, col:number}): GridStringLoc{
  return `row${row}-col${col}`;
}

function GridCell (
  { gridRow, gridColumn,  cellLocations} : { gridRow: number; gridColumn: number; cellLocations: CellLocRef },
) {

  const gridPos = toStringLoc({row: gridRow, col:gridColumn}); 
  const cellRef = React.useRef<HTMLDivElement>(null);

  const updateSize = React.useMemo(() => 

    debounce(
      () => {
        console.log(`Gathering size for ${gridPos}`)
        cellLocations.current[gridPos] = getBBoxOfDiv(cellRef.current)
      },500
    )
  ,[cellLocations, gridPos])

  React.useEffect(() => {

    const currentCell = cellRef.current;
    const ro = new ResizeObserver(entries => {
      for (let _ of entries  ) {
        updateSize();
      }
    });
    
    if (currentCell) ro.observe(currentCell)
        
    updateSize();
    return () => {
      console.log(`Removing resize listener for grid cell ${gridPos}`);
      ro.disconnect();
    }
  },[gridPos, updateSize])

  return (
    <div
    ref={cellRef}
      style={{
        gridRow,
        gridColumn,
        backgroundColor: "var(--light-grey, pink)",
      }}
    >
      {gridRow}-{gridColumn}
    </div>
  );
};
