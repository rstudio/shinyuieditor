/** Get the grid areas present in the children nodes passed to the Grid_Page()
 * component. This assumes that they are stored in the "area" property on the
 * namedArgs */

import type { ShinyUiParentNode } from "../../uiNodeTypes";

export function areasOfChildren(
  children: ShinyUiParentNode["uiChildren"] = []
) {
  let all_children_areas: string[] = [];
  children.forEach((child) => {
    if ("area" in child.namedArgs && child.namedArgs.area !== undefined) {
      const area = child.namedArgs.area;
      all_children_areas.push(area as string);
    }
  });

  return all_children_areas;
}
