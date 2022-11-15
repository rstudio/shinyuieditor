import { GridlayoutElement } from "../../components/Grids/GridlayoutElement/GridlayoutElement";
import type { UiNodeComponent } from "../uiNodeTypes";

import type { TemplatedGridProps } from ".";

export const GridlayoutGridPage: UiNodeComponent<TemplatedGridProps> = (
  args
) => {
  return <GridlayoutElement {...args} />;
};
