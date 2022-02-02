import { LayoutDispatchContext } from "components/Shiny-Ui-Elements/Layouts/GridApp";
import { AreaOverlay } from "components/Shiny-Ui-Elements/Layouts/GridApp/AreaOverlay";
import { GridCells } from "components/Shiny-Ui-Elements/Layouts/GridApp/GridCell";
import { TractControls } from "components/Shiny-Ui-Elements/Layouts/GridApp/TractControls";
import NodeUpdateContext from "components/Shiny-Ui-Elements/UiNode/NodeUpdateContext";
import { GridLocString } from "GridTypes";
import React from "react";
import { subtractElements } from "utils/array-helpers";
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

  const handleLayoutUpdate = React.useCallback(
    (action: GridLayoutAction) => {
      nodeUpdaters({
        type: "UPDATE_NODE",
        path: [],
        newNode: {
          uiName: "gridlayout::grid_page",
          uiArguments: gridLayoutReducer(uiArguments, action),
        },
      });
    },
    [nodeUpdaters, uiArguments]
  );

  React.useEffect(() => {
    // If a user removes a grid panel from the app there will be an extra area
    // in the layout that's floating around unused which can cause issues. Here
    // we make sure everytime the component renders that all the areas in the
    // layout definition are mirrored in the children and update the layout to
    // remove areas that are in the layout but not the children. This won't fix
    // the reverse situation where there is a child with a grid area now in the
    // layout.
    const extra_areas_in_layout = subtractElements(
      uniqueAreas,
      areasOfChildren(children)
    );

    if (extra_areas_in_layout.length > 0) {
      handleLayoutUpdate({
        type: "REMOVE_ITEMS",
        names: extra_areas_in_layout,
      });
    }
  }, [children, handleLayoutUpdate, uniqueAreas]);

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

/** Get the grid areas present in the children nodes passed to the Grid_Page()
 * component. This assumes that they are stored in the "area" property on the
 * uiArguments */
function areasOfChildren(children: React.ReactNode) {
  let all_children_areas: string[] = [];
  React.Children.forEach(children, (child) => {
    if (
      child &&
      typeof child === "object" &&
      "props" in child &&
      "uiArguments" in child.props &&
      "area" in child.props.uiArguments
    ) {
      all_children_areas.push(child.props.uiArguments.area);
    }
  });

  return all_children_areas;
}

export default GridlayoutGridPage;
