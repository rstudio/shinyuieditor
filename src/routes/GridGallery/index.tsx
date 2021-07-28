import { GridPreview } from "../../components/GridPreview";
import { GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export function GridGallery({
  allLayouts,
  layout,
  updateLayout,
}: {
  allLayouts: Array<GridLayoutTemplate>;
  layout: GridLayoutTemplate;
  updateLayout: (l: GridLayoutTemplate) => void;
}) {
  return (
    <>
      <h1 style="text-align: center;">Choose your layout</h1>
      <div className={classes.gallery}>
        {allLayouts.map((l) => (
          <GridPreview
            layout={l}
            displaySize={200}
            isCurrent={l.name === layout.name}
            onClick={() => updateLayout(layout)}
          />
        ))}
      </div>
    </>
  );
}
