import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import { UiNodeComponent } from "../uiComponentAndSettings";
import classes from "./styles.module.css";

const GridlayoutGridPage: UiNodeComponent<TemplatedGridProps> = ({
  uiArguments,
  children,
  ...passthroughProps
}) => {
  const { numRows, numCols, styles, sizes, uniqueAreas } =
    parseGridTemplateAreas(uiArguments);

  return (
    <div style={styles} className={classes.container} {...passthroughProps}>
      {children}
    </div>
  );
};

export default GridlayoutGridPage;
