import { FakeBrowser } from "../../components/FakeBrowser";
import { GridCard } from "../../components/GridCard";
import classes from "./style.module.css";

export default function LayoutEditor() {
  return (
    <div className={classes.editor}>
      <GridCard title="Settings" gridArea="settings" />
      <GridCard title="Instructions" gridArea="instructions" />
      <GridCard title="Elements" gridArea="elements" />
      <GridCard title="Editor" gridArea="editor">
        <FakeBrowser>
          <div>My App</div>
        </FakeBrowser>
      </GridCard>
    </div>
  );
}
