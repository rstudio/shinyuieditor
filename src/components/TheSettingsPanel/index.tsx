import { useLayoutDispatch } from "../../state-logic/layout-updating-logic";
import { CSSMeasure, GridLayoutTemplate } from "../../types";
import { CssUnitInput } from "../CssUnitInput";
import { GridCard } from "../GridCard";
import { TwoColumnGrid } from "../GridContainer";
import { SettingsIcon } from "../Icons";

export const TheSettingsPanel = ({
  gap,
}: {
  gap: GridLayoutTemplate["gap"];
}) => {
  const layoutDispatch = useLayoutDispatch();

  return (
    <GridCard title="Settings" icon={<SettingsIcon />} gridArea="settings">
      <TwoColumnGrid>
        <span> Grid Gap: </span>
        <CssUnitInput
          startValue={gap}
          onChange={(newGap: CSSMeasure) => {
            layoutDispatch({
              type: "Change-Gap",
              gap: newGap,
            });
          }}
        />
      </TwoColumnGrid>
    </GridCard>
  );
};
