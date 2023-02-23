import { BsCard } from "../../components/Grids/GridLayoutPanelHelpers/GridCards";
import { mergeClasses } from "../../utils/mergeClasses";
import { useGridItemSwapping } from "../GridlayoutGridCard/useGridItemSwapping";
import type { UiLeafNodeComponent } from "../uiNodeTypes";

import type { GridlayoutGridCardTextProps } from "./index";

import classes from "./styles.module.css";

const GridlayoutGridCardText: UiLeafNodeComponent<
  GridlayoutGridCardTextProps
> = ({
  uiArguments: { content: title, area, alignment },
  path,
  wrapperProps,
}) => {
  const compRef = useGridItemSwapping({ area, path });

  return (
    <BsCard
      ref={compRef}
      className={mergeClasses(classes.textPanel, "gridlayout-textPanel")}
      style={{ gridArea: area, justifyItems: alignment }}
      {...wrapperProps}
    >
      <h1>{title}</h1>
    </BsCard>
  );
};
export default GridlayoutGridCardText;
