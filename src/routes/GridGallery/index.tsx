import layouts from "../../layouts";
import GridPreview from "../../components/GridPreview";
import classes from "./style.module.css";

export default function GridGallery() {
  return (
    <>
      <h1 style="text-align: center;">Choose your layout</h1>
      <div className={classes.gallery}>
        {layouts.map((layout) => (
          <GridPreview layout={layout} displaySize={200} />
        ))}
      </div>
    </>
  );
}
