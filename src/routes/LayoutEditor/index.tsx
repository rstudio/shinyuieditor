import { CssUnitInput } from "../../components/CssUnitInput";
import { FakeBrowser } from "../../components/FakeBrowser";
import { GridCard } from "../../components/GridCard";
import { GridContainer } from "../../components/GridContainer";
import { GridPreviewItem } from "../../components/GridPreviewItem";
import { GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export default function LayoutEditor(props: { layout: GridLayoutTemplate }) {
  const { layout } = props;

  const newGapSize = (newGap: string) => {
    console.log(`New grid gap: ${newGap}`);
  };

  return (
    <div className={classes.editor}>
      <GridCard title="Settings" gridArea="settings">
        <CssUnitInput startUnit={"fr"} startCount={2} onChange={newGapSize} />
      </GridCard>
      <GridCard title="Instructions" gridArea="instructions" />
      <GridCard title="Elements" gridArea="elements" />
      <GridCard gridArea="editor">
        <FakeBrowser>
          <GridContainer defs={layout}>
            {layout.items.map(({ rows, cols }) => (
              <GridPreviewItem rows={rows} cols={cols} />
            ))}
          </GridContainer>
        </FakeBrowser>
      </GridCard>
    </div>
  );
}
