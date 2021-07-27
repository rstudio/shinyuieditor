import { useContext } from "preact/hooks";
import { GridPreview } from "../../components/GridPreview";
import layouts from "../../layouts";
import { CurrentLayoutCtx } from "../../manageState";
import classes from "./style.module.css";

export function GridGallery() {
  const { state, updateState } = useContext(CurrentLayoutCtx);

  return (
    <>
      <h1 style="text-align: center;">Choose your layout</h1>
      <div className={classes.gallery}>
        {layouts.map((layout) => (
          <GridPreview
            layout={layout}
            displaySize={200}
            isCurrent={layout.name === state.layout.name}
            onClick={() =>
              updateState({ type: "switch-layout", payload: layout.name })
            }
          />
        ))}
      </div>
    </>
  );
}
