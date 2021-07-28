import { useState } from "preact/hooks";
import { CssUnitInput } from "../../components/CssUnitInput";
import { FakeBrowser } from "../../components/FakeBrowser";
import { GridCard } from "../../components/GridCard";
import { GridContainer, TwoColumnGrid } from "../../components/GridContainer";
import { GridPreviewItem } from "../../components/GridPreviewItem";
import { parseCSSMeasure } from "../../helper-scripts/css-helpers";
import { GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export default function LayoutEditor(props: { layout: GridLayoutTemplate }) {
  const { layout } = props;

  const [currentGap, updateGap] = useState(parseCSSMeasure(layout.gap));

  return (
    <div className={classes.editor}>
      <GridCard title="Settings" gridArea="settings">
        <TwoColumnGrid>
          <span> Grid Gap: </span>
          <CssUnitInput startValue={currentGap} onChange={updateGap} />
        </TwoColumnGrid>
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
