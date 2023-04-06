import type { UiNodeComponent } from "../../uiNodeTypes";
import { GridContainerElement } from "../Utils/GridContainerElement/GridContainerElement";

import type { GridContainerSettings } from "./index";

const GridlayoutGridContainer: UiNodeComponent<
  GridContainerSettings,
  { TakesChildren: true }
> = ({ namedArgs, children, path, wrapperProps }) => {
  return (
    <GridContainerElement
      namedArgs={namedArgs}
      children={children}
      path={path}
      wrapperProps={wrapperProps}
    />
  );
};

export default GridlayoutGridContainer;
