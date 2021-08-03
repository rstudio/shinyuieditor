import { LayoutUpdateDispatch } from "../../state-logic/layout-updating-logic";
import { CSSMeasure } from "../../types";
import { CssUnitInput } from "../CssUnitInput";

export const SetGapSize = ({
  gapSize,
  updateLayout,
}: {
  gapSize: string;
  updateLayout: LayoutUpdateDispatch;
}) => (
  <>
    <span> Grid Gap: </span>
    <CssUnitInput
      startValue={gapSize}
      onChange={(newGap: CSSMeasure) => {
        updateLayout({
          type: "Change-Gap",
          gap: newGap,
        });
      }}
    />
  </>
);
