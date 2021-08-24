import { FunctionalComponent } from "preact";
import { memo } from "preact/compat";
import { useRef } from "preact/hooks";
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
}> = ({ value = "3fr", onChange, units = ["fr", "px", "rem", "auto"] }) => {
  const countRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLSelectElement>(null);
  const { count, unit } = parseCSSMeasure(value);

  return (
    <form
      className={classes.form}
      onChange={(e) => {
        e.preventDefault;
        onChange(
          deparseCSSMeasure({
            count: Number(countRef.current?.value) ?? 1,
            unit: (unitRef.current?.value ?? "auto") as CSSUnits,
          })
        );
      }}
      onMouseDown={(e) => e.stopImmediatePropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={countRef}
        type="number"
        min={0}
        value={count}
        step={1}
      ></input>
      <select ref={unitRef} value={unit}>
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
