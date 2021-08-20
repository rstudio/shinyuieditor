import { FunctionalComponent } from "preact";
import { memo } from "preact/compat";
import { useState } from "preact/hooks";
import {
  deparseCSSMeasure,
  parseCSSMeasure,
} from "../../helper-scripts/css-helpers";
import type { CSSMeasure, CSSUnits } from "../../types";
import classes from "./style.module.css";

let CssUnitInput: FunctionalComponent<{
  value?: CSSMeasure | string;
  onChange: (value: CSSMeasure) => void;
  units?: Array<CSSUnits>;
}> = ({ value = "1fr", onChange, units = ["fr", "px", "rem", "auto"] }) => {
  const start = parseCSSMeasure(value);
  const [currentCount, updateCount] = useState(start.count);
  const [currentUnit, updateUnit] = useState(start.unit);

  return (
    <form
      className={classes.form}
      onChange={(e) => {
        e.preventDefault;
        onChange(deparseCSSMeasure({ count: currentCount, unit: currentUnit }));
      }}
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
CssUnitInput.displayName = "CssUnitInput";
CssUnitInput = memo(CssUnitInput);
export { CssUnitInput };
