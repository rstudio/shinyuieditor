import layouts from "../../layouts";
import GridPreview from "../GridPreview";
import "./style.css";

export default function GridGallery() {
  return (
    <>
      <h1 className="title">Preact Layout Gallery!</h1>
      <div className="grid-gallery">
        {layouts.map((layout) => (
          <GridPreview layout={layout} displaySize={200} />
        ))}
      </div>
    </>
  );
}
