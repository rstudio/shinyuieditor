import { GridPreview } from "../../components/GridPreview";
import { GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export function GridGallery({
  allLayouts,
  currentLayout,
  setLayout,
}: {
  allLayouts: Array<GridLayoutTemplate>;
  currentLayout: GridLayoutTemplate;
  setLayout: (newLayout: GridLayoutTemplate) => void;
}) {
  return (
    <>
      <h1 style="text-align: center;">Choose your layout</h1>
      <div className={classes.gallery}>
        {allLayouts.map((layout) => (
          <GridPreview
            layout={layout}
            displaySize={200}
            isCurrent={layout.name === currentLayout.name}
            onClick={() => setLayout(layout)}
          />
        ))}
      </div>
    </>
  );
}
