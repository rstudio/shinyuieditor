import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import {
  deparseCSSMeasure,
  parseCSSMeasure,
} from "../../helper-scripts/css-helpers";
import { CSSMeasure, CSSUnits } from "../../types";
import classes from "./style.module.css";

export const CssUnitInput: FunctionComponent<{
  startValue?: CSSMeasure | string;
  onChange: (value: CSSMeasure) => void;
  availableUnits?: Array<CSSUnits>;
}> = ({
  startValue = "1fr",
  onChange,
  availableUnits = ["fr", "px", "rem", "auto"],
}) => {
  const start = parseCSSMeasure(startValue);
  const [currentCount, updateCount] = useState(start.count);
  const [currentUnit, updateUnit] = useState(start.unit);

  // Trigger the onChange callback anytime either the count or units update
  useEffect(() => {
    onChange(deparseCSSMeasure({ count: currentCount, unit: currentUnit }));
  }, [currentCount, currentUnit]);

  return (
    <form class={classes.form} onSubmit={(e) => e.preventDefault()}>
      <input
        type="number"
        min={0}
        value={currentCount}
        step={1}
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          updateCount(Number(target.value));
        }}
      ></input>
      <select
        value={currentUnit}
        onInput={(e) => {
          const target = e.target as HTMLSelectElement;
          updateUnit(target.value as CSSUnits);
        }}
      >
        {availableUnits.map((unit) => (
          <option value={unit}>{unit}</option>
        ))}
      </select>
    </form>
  );
};
