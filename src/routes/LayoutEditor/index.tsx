import { useState } from "preact/hooks";
import { CssUnitInput } from "../../components/CssUnitInput";
import { EditableGridItem } from "../../components/EditableGridItem";
import { FakeBrowserBar } from "../../components/FakeBrowserBar";
import { GridCard } from "../../components/GridCard";
import { GridContainer, TwoColumnGrid } from "../../components/GridContainer";
import {
  InstructionsIcon,
  ItemsIcon,
  SettingsIcon,
} from "../../components/icons";
import { ItemListItem } from "../../components/ItemListItem";
import { TheInstructions } from "../../components/TheInstructions";
import { parseCSSMeasure } from "../../helper-scripts/css-helpers";
import { GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export default function LayoutEditor(props: { layout: GridLayoutTemplate }) {
  const { layout } = props;

  const [currentGap, updateGap] = useState(parseCSSMeasure(layout.gap));

  return (
    <div className={classes.editor}>
      <GridCard title="Settings" icon={<SettingsIcon />} gridArea="settings">
        <TwoColumnGrid>
          <span> Grid Gap: </span>
          <CssUnitInput startValue={currentGap} onChange={updateGap} />
        </TwoColumnGrid>
      </GridCard>
      <GridCard
        title="Instructions"
        icon={<InstructionsIcon />}
        gridArea="instructions"
      >
        <TheInstructions />
      </GridCard>
      <GridCard title="Items" icon={<ItemsIcon />} gridArea="items">
        {layout.items.map(({ id }) => (
          <ItemListItem name={id} isDeletable />
        ))}
      </GridCard>
      <GridCard gridArea="editor" header={<FakeBrowserBar />}>
        <GridContainer defs={layout}>
          {layout.items.map(({ rows, cols }) => (
            <EditableGridItem rows={rows} cols={cols} />
          ))}
        </GridContainer>
      </GridCard>
    </div>
  );
}
