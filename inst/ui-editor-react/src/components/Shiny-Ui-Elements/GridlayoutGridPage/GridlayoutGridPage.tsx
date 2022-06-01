import React from "react";

import { AreaOverlay } from "components/Shiny-Ui-Elements/GridlayoutGridPage/AreaOverlay";
import type { CellLocRef } from "components/Shiny-Ui-Elements/GridlayoutGridPage/GridCell";
import { GridCell } from "components/Shiny-Ui-Elements/GridlayoutGridPage/GridCell";
import type {
  ShinyUiChildren,
  shinyUiNodeInfo,
  UiContainerNodeComponent,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import UiNode from "components/UiNode";
import type { DraggedNodeInfo } from "DragAndDropHelpers/DragAndDropHelpers";
import { useDispatch } from "react-redux";
import { UPDATE_NODE, usePlaceNode } from "state/uiTree";
import { enumerateGridDims, toStringLoc } from "utils/grid-helpers";
import { areasToItemLocations } from "utils/gridTemplates/itemLocations";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import type { GridItemExtent } from "utils/gridTemplates/types";

import type { GridAwareNodes } from "../GridLayoutPanelHelpers/EmptyPanelMessage/gridAwareNodes";
import { gridAwareNodes } from "../GridLayoutPanelHelpers/EmptyPanelMessage/gridAwareNodes";

import type { TemplatedGridProps } from ".";

import EditableGridContainer from "./EditableGridContainer";
import type { GridLayoutAction } from "./gridLayoutReducer";
import { gridLayoutReducer } from "./gridLayoutReducer";
import { NameNewPanelModal } from "./NameNewPanelModal";
import classes from "./styles.module.css";
import { TractControls } from "./TractControls";

export type NewItemInfo = DraggedNodeInfo & {
  pos: GridItemExtent;
};

export const LayoutDispatchContext =
  React.createContext<React.Dispatch<GridLayoutAction> | null>(null);

export const GridlayoutGridPage: UiContainerNodeComponent<
  TemplatedGridProps
> = ({
  uiArguments: layoutDef,
  uiChildren,
  children,
  eventHandlers,
  nodeInfo,
  compRef,
}) => {
  const dispatch = useDispatch();
  const place_node = usePlaceNode();

  const { onClick } = eventHandlers;

  const { areas } = layoutDef;

  const { numRows, numCols, sizes, uniqueAreas } =
    parseGridTemplateAreas(layoutDef);

  const gridCellLocations: CellLocRef = React.useRef({});
  const itemGridLocations = React.useMemo(
    () => areasToItemLocations(areas),
    [areas]
  );

  const [showModal, setShowModal] = React.useState<NewItemInfo | null>(null);

  const handleNodeDrop = (nodeInfo: NewItemInfo) => {
    const { node, currentPath, pos } = nodeInfo;
    const isNodeMove = currentPath !== undefined;
    const isGridPanel = gridAwareNodes.includes(node.uiName);
    if (
      isNodeMove &&
      isGridPanel &&
      "area" in node.uiArguments &&
      node.uiArguments.area
    ) {
      // Just move the panel and let the layout know to update. No need to
      // update the tree because nothing about the node itself changed
      const areaName = node.uiArguments.area;
      handleLayoutUpdate({ type: "MOVE_ITEM", name: areaName, pos });

      return;
    }

    setShowModal(nodeInfo);
  };

  const updateLayout = React.useCallback(
    (newLayout: TemplatedGridProps) => {
      dispatch(
        UPDATE_NODE({
          path: [],
          node: {
            uiName: "gridlayout::grid_page",
            uiArguments: newLayout,
          },
        })
      );
    },
    [dispatch]
  );

  const handleLayoutUpdate = React.useCallback(
    (action: GridLayoutAction) => {
      dispatch(
        UPDATE_NODE({
          path: [],
          node: {
            uiName: "gridlayout::grid_page",
            uiArguments: gridLayoutReducer(layoutDef, action),
          },
        })
      );
    },
    [dispatch, layoutDef]
  );

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
    "--gap": layoutDef.gapSize,
    "--row-gutter": "150px",
    "--col-gutter": "100px",
    "--pad": "8px",
  } as React.CSSProperties;

  const addNewGridItem = React.useCallback(
    (name: string, { node, currentPath, pos }: NewItemInfo) => {
      // If we're using a grid-aware node already then we just need to put the
      // new name into its settings. Otherwise automatically wrap the item in a
      // grid container

      if (gridAwareNodes.includes(node.uiName)) {
        const argsWithArea: GridAwareNodeArgs = {
          ...node.uiArguments,
          area: name,
        };
        node.uiArguments = argsWithArea;
      } else {
        node = {
          uiName: "gridlayout::grid_panel_stack",
          uiArguments: {
            area: name,
            item_alignment: "center",
          },
          uiChildren: [node],
        };
      }

      // Let the state know we have a new child node
      place_node({
        parentPath: [],
        node: node,
        currentPath,
      });

      handleLayoutUpdate({
        type: "ADD_ITEM",
        name: name,
        pos: pos,
      });

      // Reset the modal/new item info state
      setShowModal(null);
    },
    [handleLayoutUpdate, place_node]
  );

  return (
    <LayoutDispatchContext.Provider value={handleLayoutUpdate}>
      <div
        ref={compRef}
        style={stylesForGrid}
        className={classes.container}
        onClick={onClick}
        // Disable dragging on the main app
        draggable={false}
        onDragStart={() => {}}
      >
        <EditableGridContainer {...layoutDef} onNewLayout={updateLayout}>
          {enumerateGridDims({
            numRows,
            numCols,
          }).map(({ row, col }) => (
            <GridCell
              key={toStringLoc({ row, col })}
              gridRow={row}
              gridColumn={col}
              cellLocations={gridCellLocations}
              onDroppedNode={handleNodeDrop}
              containerPath={nodeInfo.path}
            />
          ))}

          {/* <TractControls areas={areas} sizes={sizes} /> */}
          {uiChildren?.map((childNode, i) => (
            <UiNode
              key={nodeInfo.path.join(".") + i}
              path={[...nodeInfo.path, i]}
              {...childNode}
            />
          ))}
          {children}
          {areaOverlays}
        </EditableGridContainer>
      </div>
      {showModal ? (
        <NameNewPanelModal
          info={showModal}
          onCancel={() => setShowModal(null)}
          onDone={(name) => addNewGridItem(name, showModal)}
          existingAreaNames={uniqueAreas}
        />
      ) : null}
    </LayoutDispatchContext.Provider>
  );
};
/** Get the grid areas present in the children nodes passed to the Grid_Page()
 * component. This assumes that they are stored in the "area" property on the
 * uiArguments */
export function areasOfChildren(children: ShinyUiChildren) {
  let all_children_areas: string[] = [];
  children.forEach((child) => {
    if ("area" in child.uiArguments && child.uiArguments.area !== undefined) {
      const area = child.uiArguments.area;
      all_children_areas.push(area);
    }
  });

  return all_children_areas;
}

type GridAwareNodeArgs =
  typeof shinyUiNodeInfo[GridAwareNodes]["defaultSettings"];
