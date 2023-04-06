import type { UiNodeComponent } from "../../uiNodeTypes";
import { GridContainerElement } from "../Utils/GridContainerElement/GridContainerElement";

import type { GridContainerSettings } from "./index";

const GridlayoutGridContainer: UiNodeComponent<
  GridContainerSettings,
  { TakesChildren: true }
> = ({ namedArgs, uiChildren, path, wrapperProps }) => {
  return (
    <GridContainerElement
      namedArgs={namedArgs}
      uiChildren={uiChildren}
      path={path}
      wrapperProps={wrapperProps}
    />
  );
};

export default GridlayoutGridContainer;
