import React from "react";

import { AreaOverlay } from "components/Shiny-Ui-Elements/GridlayoutGridPage/AreaOverlay";
import type { CellLocRef } from "components/Shiny-Ui-Elements/GridlayoutGridPage/GridCell";
import { GridCell } from "components/Shiny-Ui-Elements/GridlayoutGridPage/GridCell";
import type {
  ShinyUiChildren,
  ShinyUiNames,
  UiContainerNodeComponent,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import UiNode from "components/UiNode";
import type { DraggedNodeInfo } from "DragAndDropHelpers/DragAndDropHelpers";
import { useDispatch } from "react-redux";
import { PLACE_NODE, UPDATE_NODE } from "state/uiTree";
import { enumerateGridDims, toStringLoc } from "utils/grid-helpers";
import { areasToItemLocations } from "utils/gridTemplates/itemLocations";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import type {
  GridItemExtent,
  TemplatedGridProps,
} from "utils/gridTemplates/types";

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
  uiArguments,
  uiChildren,
  children,
  eventHandlers,
  nodeInfo,
  compRef,
}) => {
  const dispatch = useDispatch();

  const { onClick } = eventHandlers;

  const { areas } = uiArguments;

  const { numRows, numCols, styles, sizes, uniqueAreas } =
    parseGridTemplateAreas(uiArguments);

  const gridCellLocations: CellLocRef = React.useRef({});
  const itemGridLocations = React.useMemo(
    () => areasToItemLocations(areas),
    [areas]
  );

  const [showModal, setShowModal] = React.useState<NewItemInfo | null>(null);

  const handleNodeDrop = (nodeInfo: NewItemInfo) => {
    const { node, currentPath, pos } = nodeInfo;
    const isNodeMove = currentPath !== undefined;
    const isGridPanel = [
      "gridlayout::grid_panel",
      "gridlayout::title_panel",
      "gridlayout::vertical_stack_panel",
    ].includes(node.uiName);
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

  const handleLayoutUpdate = React.useCallback(
    (action: GridLayoutAction) => {
      dispatch(
        UPDATE_NODE({
          path: [],
          node: {
            uiName: "gridlayout::grid_page",
            uiArguments: gridLayoutReducer(uiArguments, action),
          },
        })
      );
    },
    [dispatch, uiArguments]
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
    ...styles,
    "--gap": uiArguments.gapSize,
    "--row-gutter": "150px",
    "--col-gutter": "100px",
  } as React.CSSProperties;

  const addNewGridItem = React.useCallback(
    (name: string, { node, currentPath, pos }: NewItemInfo) => {
      // If we're using a grid-aware node already then we just need to put the
      // new name into its settings. Otherwise automatically wrap the item in a
      // grid container
      if (gridAwareNodes.includes(node.uiName)) {
        node.uiArguments = { ...node.uiArguments, area: name };
      } else {
        node = {
          uiName: "gridlayout::vertical_stack_panel",
          uiArguments: {
            area: name,
            item_alignment: "center",
          },
          uiChildren: [node],
        };
      }

      // Let the state know we have a new child node
      dispatch(
        PLACE_NODE({
          parentPath: [],
          node: node,
          currentPath,
        })
      );

      handleLayoutUpdate({
        type: "ADD_ITEM",
        name: name,
        pos: pos,
      });

      // Reset the modal/new item info state
      setShowModal(null);
    },
    [dispatch, handleLayoutUpdate]
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
          />
        ))}

        <TractControls areas={areas} sizes={sizes} />
        {uiChildren?.map((childNode, i) => (
          <UiNode
            key={nodeInfo.path.join(".") + i}
            path={[...nodeInfo.path, i]}
            {...childNode}
          />
        ))}
        {children}
        {areaOverlays}
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

// These are nodes that don't need to be wrapped in a grid_panel if dropped
export const gridAwareNodes: ShinyUiNames[] = [
  "gridlayout::grid_panel",
  "gridlayout::title_panel",
  "gridlayout::text_panel",
  "gridlayout::vertical_stack_panel",
];
