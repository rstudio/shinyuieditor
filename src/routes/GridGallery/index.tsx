import { GridPreview } from "../../components/GridPreview";
import layouts from "../../layouts";
import { GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export function GridGallery(props: {
  layout: GridLayoutTemplate;
  updateLayout: (l: GridLayoutTemplate) => void;
}) {
  return (
    <>
      <h1 style="text-align: center;">Choose your layout</h1>
      <div className={classes.gallery}>
        {layouts.map((layout) => (
          <GridPreview
            layout={layout}
            displaySize={200}
            isCurrent={layout.name === props.layout.name}
            onClick={() => props.updateLayout(layout)}
          />
        ))}
      </div>
    </>
  );
}
