import { AreaOverlay } from "components/Shiny-Ui-Elements/Layouts/GridApp/AreaOverlay";
import { GridCells } from "components/Shiny-Ui-Elements/Layouts/GridApp/GridCell";
import { NodeUpdateContext } from "components/Shiny-Ui-Elements/UiTree";
import { GridLocString } from "GridTypes";
import React from "react";
import addItem from "utils/gridTemplates/addItem";
import { areasToItemLocations } from "utils/gridTemplates/itemLocations";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import { GridItemExtent, TemplatedGridProps } from "utils/gridTemplates/types";
import { ItemBoundingBox } from "utils/overlap-helpers";
import { UiNodeComponent } from "../uiComponentAndSettings";
import classes from "./styles.module.css";

export type GridCellBounds = Record<GridLocString, ItemBoundingBox>;
export type CellLocRef = React.MutableRefObject<GridCellBounds>;

const GridlayoutGridPage: UiNodeComponent<TemplatedGridProps> = ({
  uiArguments,
  children,
  ...passthroughProps
}) => {
  const { areas } = uiArguments;
  const { numRows, numCols, styles, sizes, uniqueAreas } =
    parseGridTemplateAreas(uiArguments);

  const nodeUpdaters = React.useContext(NodeUpdateContext);

  const gridCellLocations: CellLocRef = React.useRef({});
  const itemGridLocations = React.useMemo(
    () => areasToItemLocations(areas),
    [areas]
  );

  const handleItemMove = ({
    area,
    pos,
  }: {
    area: string;
    pos: GridItemExtent;
  }) => {
    nodeUpdaters.updateNode([], {
      uiName: "gridlayout::grid_page",
      uiArguments: addItem(uiArguments, { name: area, ...pos }),
    });
  };

  const areaOverlays = uniqueAreas.map((area) => (
    <AreaOverlay
      key={area}
      area={area}
      areas={areas}
      cellLocRef={gridCellLocations}
      gridLocation={itemGridLocations.get(area)}
      onNewPos={(pos) => handleItemMove({ area, pos })}
    />
  ));

  return (
    <div style={styles} className={classes.container} {...passthroughProps}>
      <GridCells
        numCols={numCols}
        numRows={numRows}
        cellLocRef={gridCellLocations}
        onClick={() => console.log("Clicked a cell")}
      />
      {children}
      {areaOverlays}
    </div>
  );
};

export default GridlayoutGridPage;
