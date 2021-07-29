import { CSSMeasure, TractValue } from "../../types";
import { CssUnitInput } from "../CssUnitInput";
import { GridItem } from "../GridItem";
import classes from "./style.module.css";

export const GridTractControl = ({
  val,
  dir,
  index,
  onChange,
}: TractValue & {
  onChange: (newValue: TractValue) => void;
}) => {
  const tractPlacement: [number, number] = [index + 1, index + 1];
  const offDirectionPlacement: [number, number] = [1, -1];
  return (
    <GridItem
      rows={dir === "rows" ? tractPlacement : offDirectionPlacement}
      cols={dir === "cols" ? tractPlacement : offDirectionPlacement}
      className={
        dir === "rows" ? classes.rowSizeControls : classes.colSizeControls
      }
    >
      <CssUnitInput
        startValue={val as CSSMeasure}
        onChange={(newVal: CSSMeasure) => {
          onChange({
            val: newVal,
            dir,
            index,
          });
        }}
      />
    </GridItem>
  );
};
