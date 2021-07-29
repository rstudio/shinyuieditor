import { CssUnitInput } from "../../components/CssUnitInput";
import { EditableGridItem } from "../../components/EditableGridItem";
import { FakeBrowserBar } from "../../components/FakeBrowserBar";
import { GridCard } from "../../components/GridCard";
import { TwoColumnGrid } from "../../components/GridContainer";
import {
  InstructionsIcon,
  ItemsIcon,
  SettingsIcon,
} from "../../components/icons";
import { ItemListItem } from "../../components/ItemListItem";
import { TheAppGridContainer } from "../../components/TheAppGridContainer";
import { TheInstructions } from "../../components/TheInstructions";
import { parseCSSMeasure } from "../../helper-scripts/css-helpers";
import { LayoutUpdateDispatch } from "../../layout-updating-logic";
import { CSSMeasure, GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export default function LayoutEditor(props: {
  layout: GridLayoutTemplate;
  updateLayout: LayoutUpdateDispatch;
}) {
  const { layout, updateLayout } = props;
  const updateGap = (newGap: CSSMeasure) => {
    updateLayout({
      type: "Change-Gap",
      gap: `${newGap.count}${newGap.unit}`,
    });
  };

  console.log("Rendering layout editor");

  return (
    <div className={classes.editor}>
      <GridCard title="Settings" icon={<SettingsIcon />} gridArea="settings">
        <TwoColumnGrid>
          <span> Grid Gap: </span>
          <CssUnitInput
            startValue={parseCSSMeasure(layout.gap)}
            onChange={updateGap}
          />
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
        <TheAppGridContainer defs={layout}>
          {layout.items.map(({ rows, cols }) => (
            <EditableGridItem rows={rows} cols={cols} />
          ))}
        </TheAppGridContainer>
      </GridCard>
    </div>
  );
}
