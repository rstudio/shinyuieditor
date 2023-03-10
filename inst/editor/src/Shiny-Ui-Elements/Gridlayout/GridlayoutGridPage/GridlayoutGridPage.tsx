import type { UiNodeComponent } from "../../uiNodeTypes";
import { GridContainerElement } from "../Utils/GridContainerElement/GridContainerElement";
import type { GridLayoutArgs } from "../Utils/GridContainerElement/GridLayoutArgs";

export const GridlayoutGridPage: UiNodeComponent<
  GridLayoutArgs,
  { TakesChildren: true }
> = (args) => {
  return <GridContainerElement {...args} />;
};
