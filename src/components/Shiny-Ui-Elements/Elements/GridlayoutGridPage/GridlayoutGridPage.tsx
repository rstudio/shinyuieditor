import React from "react";

import { DraggedNodeInfo } from "components/Shiny-Ui-Elements/DragAndDropHelpers/DragAndDropHelpers";
import { AreaOverlay } from "components/Shiny-Ui-Elements/Elements/GridlayoutGridPage/AreaOverlay";
import {
  CellLocRef,
  GridCell,
} from "components/Shiny-Ui-Elements/Elements/GridlayoutGridPage/GridCell";
import {
  ShinyUiChildren,
  ShinyUiNode,
  UiContainerNodeComponent,
} from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import UiNode from "components/Shiny-Ui-Elements/UiNode";
import { subtractElements } from "utils/array-helpers";
import { enumerateGridDims, toStringLoc } from "utils/grid-helpers";
import { areasToItemLocations } from "utils/gridTemplates/itemLocations";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import { GridItemExtent, TemplatedGridProps } from "utils/gridTemplates/types";

import {
  sendTreeUpdateMessage,
  useListenForTreeUpdateEvent,
} from "../../UiNode/TreeManipulation/treeUpdateEvents";
import { GridPanelSettings } from "../GridlayoutGridPanel";

import { GridLayoutAction, gridLayoutReducer } from "./gridLayoutReducer";
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
  const { onClick } = eventHandlers;
  const { path } = nodeInfo;
  const { areas } = uiArguments;

  const { numRows, numCols, styles, sizes, uniqueAreas } =
    parseGridTemplateAreas(uiArguments);

  const gridCellLocations: CellLocRef = React.useRef({});
  const itemGridLocations = React.useMemo(
    () => areasToItemLocations(areas),
    [areas]
  );

  const [showModal, setShowModal] = React.useState<NewItemInfo | null>(null);

  const handleLayoutUpdate = React.useCallback(
    (action: GridLayoutAction) => {
      sendTreeUpdateMessage({
        type: "UPDATE_NODE",
        path: [],
        node: {
          uiName: "gridlayout::grid_page",
          uiArguments: gridLayoutReducer(uiArguments, action),
        },
      });
    },
    [uiArguments]
  );

  useListenForTreeUpdateEvent((e) => {
    // We're assuming that this grid layout is at the root of the tree. This
    // will break if we have nested grid layouts...
    const childNodeChange = e.type === "UPDATE_NODE" && e.path.length === 1;
    if (childNodeChange) {
      const oldAreaName = areasOfChildren(uiChildren)[e.path[0]];
      const newAreaName = (e.node.uiArguments as GridPanelSettings).area;
      if (typeof newAreaName === "undefined") {
        console.error(
          "Somehow a child of the gridlayout page doesn't have a grid area value..."
        );
        return;
      }

      if (oldAreaName !== newAreaName) {
        handleLayoutUpdate({
          type: "RENAME_ITEM",
          oldName: oldAreaName,
          newName: newAreaName,
        });
      }
    }
  });

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
      areasOfChildren(uiChildren)
    );

    if (extra_areas_in_layout.length > 0) {
      handleLayoutUpdate({
        type: "REMOVE_ITEMS",
        names: extra_areas_in_layout,
      });
    }
  }, [children, handleLayoutUpdate, uiChildren, uniqueAreas]);

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
      handleLayoutUpdate({
        type: "ADD_ITEM",
        name: name,
        pos: pos,
      });

      // If we're using a grid-aware node already then we just need to put the
      // new name into its settings. Otherwise automatically wrap the item in a
      // grid container
      if (
        node.uiName === "gridlayout::grid_panel" ||
        node.uiName === "gridlayout::title_panel" ||
        node.uiName === "gridlayout::vertical_stack_panel"
      ) {
        node.uiArguments.area = name;
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
      sendTreeUpdateMessage({
        type: "PLACE_NODE",
        parentPath: [],
        node: node,
        currentPath,
      });

      // Reset the modal/new item info state
      setShowModal(null);
    },
    [handleLayoutUpdate]
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
            onDroppedNode={setShowModal}
          />
        ))}

        <TractControls areas={areas} sizes={sizes} />
        {uiChildren?.map((childNode, i) => (
          <UiNode key={path.join(".") + i} path={[...path, i]} {...childNode} />
        ))}
        {children}
        {areaOverlays}
      </div>
      {showModal ? (
        <NameNewPanelModal
          info={showModal}
          onCancel={() => setShowModal(null)}
          onDone={(name) => addNewGridItem(name, showModal)}
        />
      ) : null}
    </LayoutDispatchContext.Provider>
  );
};
/** Get the grid areas present in the children nodes passed to the Grid_Page()
 * component. This assumes that they are stored in the "area" property on the
 * uiArguments */
function areasOfChildren(children: ShinyUiChildren) {
  let all_children_areas: string[] = [];
  children.forEach((child) => {
    if ("area" in child.uiArguments && child.uiArguments.area !== undefined) {
      const area = child.uiArguments.area;
      all_children_areas.push(area);
    }
  });

  return all_children_areas;
}
