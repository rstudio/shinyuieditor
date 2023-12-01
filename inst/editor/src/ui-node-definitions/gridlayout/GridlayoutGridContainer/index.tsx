import icon from "../../../assets/icons/shinyGridContainer.png";
import { addEditorInfoToUiNode } from "../../../Shiny-Ui-Elements/utils/add_editor_info_to_ui_node";
import type { GridLayoutArgs } from "../GridLayoutArgs";
import { GridContainerElement } from "../Utils/GridContainerElement/GridContainerElement";
import {
  removeDeletedGridAreaFromLayout,
  updateGridLayoutAreaOnItemAreaChange,
} from "../Utils/watchAndReactToGridAreaUpdatesupdate";

import { grid_container } from "./grid_container";

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
