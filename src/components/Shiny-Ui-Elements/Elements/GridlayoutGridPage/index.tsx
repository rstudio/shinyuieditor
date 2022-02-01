import { LayoutDispatchContext } from "components/Shiny-Ui-Elements/Layouts/GridApp";
import { AreaOverlay } from "components/Shiny-Ui-Elements/Layouts/GridApp/AreaOverlay";
import { GridCells } from "components/Shiny-Ui-Elements/Layouts/GridApp/GridCell";
import { TractControls } from "components/Shiny-Ui-Elements/Layouts/GridApp/TractControls";
import NodeUpdateContext from "components/Shiny-Ui-Elements/UiNode/NodeUpdateContext";
import { GridLocString } from "GridTypes";
import React from "react";
import { areasToItemLocations } from "utils/gridTemplates/itemLocations";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import { ItemBoundingBox } from "utils/overlap-helpers";
import { UiNodeComponent } from "../uiComponentAndSettings";
import { GridLayoutAction, gridLayoutReducer } from "./gridLayoutReducer";
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

  const handleLayoutUpdate = (action: GridLayoutAction) => {
    nodeUpdaters.updateNode([], {
      uiName: "gridlayout::grid_page",
      uiArguments: gridLayoutReducer(uiArguments, action),
    });
  };

  const areaOverlays = uniqueAreas.map((area) => (
    <AreaOverlay
      key={area}
      area={area}
      areas={areas}
      cellLocRef={gridCellLocations}
      gridLocation={itemGridLocations.get(area)}
      onNewPos={(pos) =>
        handleLayoutUpdate({ type: "MOVE_ITEM", name: area, pos })
      }
    />
  ));

  const stylesForGrid = {
    ...styles,
    "--gap": uiArguments.gapSize,
    "--row-gutter": "150px",
    "--col-gutter": "100px",
  } as React.CSSProperties;

  return (
    <LayoutDispatchContext.Provider value={handleLayoutUpdate}>
      <div
        style={stylesForGrid}
        className={classes.container}
        {...passthroughProps}
      >
        <GridCells
          numCols={numCols}
          numRows={numRows}
          cellLocRef={gridCellLocations}
          onClick={() => console.log("Clicked a cell")}
        />
        <TractControls areas={areas} sizes={sizes} />
        {children}
        {areaOverlays}
      </div>
    </LayoutDispatchContext.Provider>
  );
};

export default GridlayoutGridPage;
