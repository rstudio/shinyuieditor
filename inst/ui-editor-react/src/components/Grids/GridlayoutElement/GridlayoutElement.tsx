import React from "react";

import { AreaOverlay } from "components/Grids/AreaOverlay";
import { GridCell } from "components/Grids/GridCell";
import { LayoutDispatchContext } from "components/Grids/useSetLayout";
import UiNode from "components/UiNode/UiNode";
import type { DraggedNodeInfo } from "DragAndDropHelpers/DragAndDropHelpers";
import type { TemplatedGridProps } from "Shiny-Ui-Elements/GridlayoutGridPage";
import type { GridAwareNodes } from "Shiny-Ui-Elements/GridLayoutPanelHelpers/EmptyPanelMessage/gridAwareNodes";
import { gridAwareNodes } from "Shiny-Ui-Elements/GridLayoutPanelHelpers/EmptyPanelMessage/gridAwareNodes";
import { makeChildPath } from "Shiny-Ui-Elements/nodePathUtils";
import type {
  ShinyUiNodeInfo,
  UiNodeComponent,
} from "Shiny-Ui-Elements/uiNodeTypes";
import { usePlaceNode } from "state/uiTree";
import { findEmptyCells } from "utils/gridTemplates/findItemLocation";
import { areasToItemLocations } from "utils/gridTemplates/itemLocations";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import type { GridItemExtent } from "utils/gridTemplates/types";

import { useUpdateUiArguments } from "../../../state/useUpdateUiArguments";
import EditableGridContainer from "../EditableGridContainer";
import type { GridLayoutAction } from "../gridLayoutReducer";
import { gridLayoutReducer } from "../gridLayoutReducer";
import { toStringLoc } from "../helpers";
import { NameNewPanelModal } from "../NameNewPanelModal";

import classes from "./styles.module.css";
export type GridAwareNodeArgs =
  ShinyUiNodeInfo[GridAwareNodes]["defaultSettings"];

export type NewItemInfo = DraggedNodeInfo & {
  pos: GridItemExtent;
};

export const GridlayoutElement: UiNodeComponent<TemplatedGridProps> = ({
  uiArguments: layoutDef,
  uiChildren,
  path,
  wrapperProps,
}) => {
  const place_node = usePlaceNode();

  const { uniqueAreas } = parseGridTemplateAreas(layoutDef);

  const { areas } = layoutDef;
  const updateArguments = useUpdateUiArguments(path);
  const itemGridLocations = React.useMemo(
    () => areasToItemLocations(areas),
    [areas]
  );

  const [showModal, setShowModal] = React.useState<NewItemInfo | null>(null);

  const handleNodeDrop = (nodeInfo: NewItemInfo) => {
    const { node, currentPath, pos } = nodeInfo;
    const isNodeMove = currentPath !== undefined;
    const isGridCard = gridAwareNodes.includes(node.uiName);

    if (
      isNodeMove &&
      isGridCard &&
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

  const handleLayoutUpdate = (action: GridLayoutAction) => {
    updateArguments(gridLayoutReducer(layoutDef, action));
  };

  const areaOverlays = uniqueAreas.map((area) => (
    <AreaOverlay
      key={area}
      area={area}
      areas={areas}
      gridLocation={itemGridLocations.get(area)}
      onNewPos={(pos) =>
        handleLayoutUpdate({ type: "MOVE_ITEM", name: area, pos })
      }
    />
  ));

  const stylesForGrid = {
    "--gap": layoutDef.gap_size,
    "--row-gutter": "150px",
    "--col-gutter": "100px",
    "--pad": "8px",
  } as React.CSSProperties;

  const addNewGridItem = (
    name: string,
    { node, currentPath, pos }: NewItemInfo
  ) => {
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
        uiName: "gridlayout::grid_card",
        uiArguments: { area: name },
        uiChildren: [node],
      };
    }

    // Let the state know we have a new child node
    place_node({
      // Place in the last position
      path: makeChildPath(path, uiChildren?.length ?? 0),
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
  };

  return (
    <LayoutDispatchContext.Provider value={handleLayoutUpdate}>
      <div
        style={stylesForGrid}
        className={classes.container}
        {...wrapperProps}
        // Disable dragging on the main app. Note this is below the wrapperProps passthrough
        draggable={false}
        onDragStart={() => {}}
      >
        <EditableGridContainer {...layoutDef} onNewLayout={updateArguments}>
          {findEmptyCells(areas).map(({ row, col }) => (
            <GridCell
              key={toStringLoc({ row, col })}
              gridRow={row}
              gridColumn={col}
              onDroppedNode={handleNodeDrop}
            />
          ))}
          {uiChildren?.map((childNode, i) => (
            <UiNode
              key={path.join(".") + i}
              path={[...path, i]}
              node={childNode}
            />
          ))}
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
