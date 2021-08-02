import { useReducer } from "preact/hooks";
import { CssUnitInput } from "../../components/CssUnitInput";
import { EditableGridItem } from "../../components/EditableGridItem";
import { FakeBrowserBar } from "../../components/FakeBrowserBar";
import { GridCard } from "../../components/GridCard";
import { TwoColumnGrid } from "../../components/GridContainer";
import { GridTractControl } from "../../components/GridTractControl";
import {
  InstructionsIcon,
  ItemsIcon,
  SettingsIcon,
} from "../../components/icons";
import { ItemListItem } from "../../components/ItemListItem";
import { TheAppGridContainer } from "../../components/TheAppGridContainer";
import { TheInstructions } from "../../components/TheInstructions";
import { LayoutDispatch, layoutUpdater } from "../../layout-updating-logic";
import { CSSMeasure, GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export default function LayoutEditor(props: {
  startingLayout: GridLayoutTemplate;
}) {
  const [layout, updateLayout] = useReducer(
    layoutUpdater,
    props.startingLayout
  );

  return (
    <LayoutDispatch.Provider value={updateLayout}>
      <div className={classes.editor}>
        <GridCard title="Settings" icon={<SettingsIcon />} gridArea="settings">
          <TwoColumnGrid>
            <span> Grid Gap: </span>
            <CssUnitInput
              startValue={layout.gap}
              onChange={(newGap: CSSMeasure) => {
                updateLayout({
                  type: "Change-Gap",
                  gap: newGap,
                });
              }}
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
          {layout.items.map(({ name }) => (
            <ItemListItem name={name} isDeletable />
          ))}
        </GridCard>
        <GridCard gridArea="editor" header={<FakeBrowserBar />} padding={"0px"}>
          <TheAppGridContainer defs={layout}>
            {layout.rows.map((r, i) => (
              <GridTractControl val={r} index={i} dir={"rows"} />
            ))}
            {layout.cols.map((c, i) => (
              <GridTractControl val={c} index={i} dir={"cols"} />
            ))}
            {layout.items.map(({ rows, cols }) => (
              <EditableGridItem rows={rows} cols={cols} />
            ))}
          </TheAppGridContainer>
        </GridCard>
      </div>
    </LayoutDispatch.Provider>
  );
}
