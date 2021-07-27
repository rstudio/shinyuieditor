import { useContext } from "preact/hooks";
import { FakeBrowser } from "../../components/FakeBrowser";
import { GridCard } from "../../components/GridCard";
import { GridContainer } from "../../components/GridContainer";
import { GridPreviewItem } from "../../components/GridPreviewItem";
import { CurrentLayoutCtx } from "../../manageState";
import classes from "./style.module.css";

export default function LayoutEditor() {
  const { state, updateState } = useContext(CurrentLayoutCtx);

  return (
    <div className={classes.editor}>
      <GridCard title="Settings" gridArea="settings" />
      <GridCard title="Instructions" gridArea="instructions" />
      <GridCard title="Elements" gridArea="elements" />
      <GridCard title="Editor" gridArea="editor">
        <FakeBrowser>
          <GridContainer defs={state.layout}>
            {state.layout.items.map(({ rows, cols }) => (
              <GridPreviewItem rows={rows} cols={cols} />
            ))}
          </GridContainer>
        </FakeBrowser>
      </GridCard>
    </div>
  );
}
