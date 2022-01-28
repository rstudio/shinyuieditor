import { LayoutDispatchContext } from "components/Shiny-Ui-Elements/Layouts/GridApp";
import { AreaOverlay } from "components/Shiny-Ui-Elements/Layouts/GridApp/AreaOverlay";
import { GridCells } from "components/Shiny-Ui-Elements/Layouts/GridApp/GridCell";
import { TractDirection } from "components/Shiny-Ui-Elements/Layouts/GridApp/helpers";
import { TractControls } from "components/Shiny-Ui-Elements/Layouts/GridApp/TractControls";
import { NodeUpdateContext } from "components/Shiny-Ui-Elements/UiTree";
import { CSSMeasure, GridLocString } from "GridTypes";
import clone from "just-clone";
import React from "react";
import addItem from "utils/gridTemplates/addItem";
import addTract from "utils/gridTemplates/addTract";
import { areasToItemLocations } from "utils/gridTemplates/itemLocations";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import removeItem from "utils/gridTemplates/removeItem";
import removeTract from "utils/gridTemplates/removeTract";
import resizeTract from "utils/gridTemplates/resizeTract";
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

export type GridLayoutAction =
  | { type: "ADD_ITEM"; name: string; pos: GridItemExtent }
  | { type: "REMOVE_ITEM"; name: string }
  | { type: "MOVE_ITEM"; name: string; pos: GridItemExtent }
  | {
      type: "ADD_TRACT";
      dir: TractDirection;
      afterIndex: number;
      size: CSSMeasure;
    }
  | {
      type: "REMOVE_TRACT";
      dir: TractDirection;
      index: number;
    }
  | {
      type: "RESIZE_TRACT";
      dir: TractDirection;
      index: number;
      size: CSSMeasure;
    }
  | {
      type: "SET_GAP";
      size: CSSMeasure;
    };

function gridLayoutReducer(
  layout: TemplatedGridProps,
  action: GridLayoutAction
): TemplatedGridProps {
  switch (action.type) {
    case "ADD_ITEM":
    // eslint-disable-next-line no-fallthrough
    case "MOVE_ITEM":
      return addItem(layout, { name: action.name, ...action.pos });

    case "REMOVE_ITEM":
      return removeItem(layout, action.name);

    case "ADD_TRACT":
      return addTract(layout, action);

    case "REMOVE_TRACT":
      return removeTract(layout, action);

    case "RESIZE_TRACT":
      return resizeTract(
        layout,
        { dir: action.dir, index: action.index },
        action.size
      );

    case "SET_GAP":
      return { ...clone(layout), gapSize: action.size };

    default:
      console.error(action);
      throw new Error("Have yet to implement layout action type");
  }
}

export default GridlayoutGridPage;
