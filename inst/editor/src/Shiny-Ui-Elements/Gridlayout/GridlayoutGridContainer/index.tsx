import { grid_container } from "ui-node-definitions/src/gridlayout/grid_container";

import icon from "../../../assets/icons/shinyGridContainer.png";
import { add_editor_info_to_ui_node } from "../../utils/add_editor_info_to_ui_node";
import { GridContainerElement } from "../Utils/GridContainerElement/GridContainerElement";
import type { GridLayoutArgs } from "../Utils/GridContainerElement/GridLayoutArgs";
import {
  removeDeletedGridAreaFromLayout,
  updateGridLayoutAreaOnItemAreaChange,
} from "../Utils/watchAndReactToGridAreaUpdatesupdate";

export type GridContainerSettings = GridLayoutArgs;

export const gridlayoutGridContainerInfo = add_editor_info_to_ui_node(
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
