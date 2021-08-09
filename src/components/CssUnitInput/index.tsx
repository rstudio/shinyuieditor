import type { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import {
  deparseCSSMeasure,
  parseCSSMeasure,
} from "../../helper-scripts/css-helpers";
import type { CSSMeasure, CSSUnits } from "../../types";
import classes from "./style.module.css";

export const CssUnitInput: FunctionComponent<{
  value?: CSSMeasure | string;
  onChange: (value: CSSMeasure) => void;
  units?: Array<CSSUnits>;
}> = ({ value = "1fr", onChange, units = ["fr", "px", "rem", "auto"] }) => {
  const start = parseCSSMeasure(value);
  const [currentCount, updateCount] = useState(start.count);
  const [currentUnit, updateUnit] = useState(start.unit);

  // Trigger the onChange callback anytime either the count or units update
  useEffect(() => {
    onChange(deparseCSSMeasure({ count: currentCount, unit: currentUnit }));
  }, [currentCount, currentUnit]);

  return (
    <form
      className={classes.form}
      onMouseDown={(e) => e.stopImmediatePropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
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
        {units.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    </form>
  );
};
