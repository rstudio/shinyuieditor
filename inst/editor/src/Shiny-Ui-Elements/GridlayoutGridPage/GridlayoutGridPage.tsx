import type { GridLayoutArgs } from "../../components/GridlayoutElement/GridLayoutArgs";
import { GridlayoutElement } from "../../components/GridlayoutElement/GridlayoutElement";
import type { UiNodeComponent } from "../uiNodeTypes";

export const GridlayoutGridPage: UiNodeComponent<GridLayoutArgs> = (args) => {
  return <GridlayoutElement {...args} />;
};
