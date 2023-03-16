import { mergeClasses } from "../../../utils/mergeClasses";
import type { UiNodeComponent } from "../../uiNodeTypes";
import { BsCard } from "../Utils/GridLayoutPanelHelpers/GridCards";
import { useGridItemSwapping } from "../Utils/useGridItemSwapping";

import type { GridlayoutGridCardTextProps } from "./index";

import classes from "./styles.module.css";

const GridlayoutGridCardText: UiNodeComponent<
  GridlayoutGridCardTextProps,
  { TakesChildren: false }
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
      <div className={classes.text_holder}>
        <h1>{title}</h1>
      </div>
    </BsCard>
  );
};
export default GridlayoutGridCardText;
