import type { UiNodeComponent } from "../../uiNodeTypes";
import type { GridLayoutArgs } from "../Utils/GridContainerElement/GridLayoutArgs";
import { GridContainerElement } from "../Utils/GridContainerElement/GridContainerElement";

export const GridlayoutGridPage: UiNodeComponent<GridLayoutArgs> = (args) => {
  return <GridContainerElement {...args} />;
};
