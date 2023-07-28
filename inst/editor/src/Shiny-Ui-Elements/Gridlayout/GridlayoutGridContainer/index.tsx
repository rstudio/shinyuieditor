import { grid_container } from "ui-node-definitions/src/gridlayout/grid_container";
import type { GridLayoutArgs } from "ui-node-definitions/src/gridlayout/GridLayoutArgs";

import icon from "../../../assets/icons/shinyGridContainer.png";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";
import { GridContainerElement } from "../Utils/GridContainerElement/GridContainerElement";
import {
  removeDeletedGridAreaFromLayout,
  updateGridLayoutAreaOnItemAreaChange,
} from "../Utils/watchAndReactToGridAreaUpdatesupdate";

export type GridContainerSettings = GridLayoutArgs;

export const gridlayoutGridContainerInfo = addEditorInfoToUiNode(
  grid_container,
  {
    iconSrc: icon,
    UiComponent: ({ namedArgs, children, path, wrapperProps }) => {
      return (
        <GridContainerElement
          namedArgs={namedArgs}
          children={children}
          path={path}
          wrapperProps={wrapperProps}
        />
      );
    },
    stateUpdateSubscribers: {
      UPDATE_NODE: updateGridLayoutAreaOnItemAreaChange,
      DELETE_NODE: removeDeletedGridAreaFromLayout,
    },
  }
);
