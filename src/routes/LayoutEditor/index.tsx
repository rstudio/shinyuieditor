import { useReducer } from "preact/hooks";
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
import { layoutUpdater } from "../../layout-updating-logic";
import { CSSMeasure, GridLayoutTemplate, TractValue } from "../../types";
import { GridTractControl } from "../../components/GridTractControl";

import classes from "./style.module.css";

export default function LayoutEditor(props: {
  startingLayout: GridLayoutTemplate;
}) {
  const [layout, updateLayout] = useReducer(
    layoutUpdater,
    props.startingLayout
  );

  const updateGap = (newGap: CSSMeasure) => {
    updateLayout({
      type: "Change-Gap",
      gap: newGap,
    });
  };

  const updateTract = (newTract: TractValue) => {
    console.log(
      `Tract Update:  ${newTract.dir} ${newTract.index} changed to ${newTract.val}`
    );
    updateLayout({
      type: "Change-Tract",
      value: newTract,
    });
  };

  return (
    <div className={classes.editor}>
      <GridCard title="Settings" icon={<SettingsIcon />} gridArea="settings">
        <TwoColumnGrid>
          <span> Grid Gap: </span>
          <CssUnitInput startValue={layout.gap} onChange={updateGap} />
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
      <GridCard gridArea="editor" header={<FakeBrowserBar />} padding={"0px"}>
        <TheAppGridContainer defs={layout}>
          {layout.rows.map((r, i) => (
            <GridTractControl
              val={r}
              index={i}
              dir={"rows"}
              onChange={updateTract}
            />
          ))}
          {layout.cols.map((c, i) => (
            <GridTractControl
              val={c}
              index={i}
              dir={"cols"}
              onChange={updateTract}
            />
          ))}
          {layout.items.map(({ rows, cols }) => (
            <EditableGridItem rows={rows} cols={cols} />
          ))}
        </TheAppGridContainer>
      </GridCard>
    </div>
  );
}
