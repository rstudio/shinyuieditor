import { GridPreview } from "../../components/GridPreview";
import { GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export function GridGallery({
  allLayouts,
  currentLayoutName,
  chooseLayout,
}: {
  allLayouts: Array<GridLayoutTemplate>;
  currentLayoutName: string;
  chooseLayout: (newLayoutName: string) => void;
}) {
  return (
    <>
      <h1 style="text-align: center;">Choose your layout</h1>
      <div className={classes.gallery}>
        {allLayouts.map((layout) => (
          <GridPreview
            layout={layout}
            displaySize={200}
            isCurrent={layout.name === currentLayoutName}
            onClick={() => chooseLayout(layout.name)}
          />
        ))}
      </div>
    </>
  );
}
