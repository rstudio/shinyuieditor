import type { UiNodeComponent } from "../../uiNodeTypes";
import { GridContainerElement } from "../Utils/GridContainerElement/GridContainerElement";

import type { GridContainerSettings } from "./index";

const GridlayoutGridContainer: UiNodeComponent<
  GridContainerSettings,
  { TakesChildren: true }
> = ({ uiArguments, uiChildren, path, wrapperProps }) => {
  return (
    <GridContainerElement
      uiArguments={uiArguments}
      uiChildren={uiChildren}
      path={path}
      wrapperProps={wrapperProps}
    />
  );
};

export default GridlayoutGridContainer;
