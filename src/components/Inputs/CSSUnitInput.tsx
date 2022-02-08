import * as React from "react";
import {
  deparseCSSMeasure,
  parseCSSMeasure,
  ParsedCSSMeasure,
  updateCssUnit,
} from "utils/css-helpers";
import { CSSMeasure } from "../../GridTypes";
import classes from "./CSSUnitInput.module.css";

type CSSUnits = "fr" | "px" | "rem" | "auto";

export function CSSUnitInput({
  value: initialValue,
  onChange,
  units = ["fr", "px", "rem", "auto"],
  w = "150px",
  label = "CSS units input",
}: {
  value: CSSMeasure;
  units?: CSSUnits[];
  onChange: (value: CSSMeasure) => void;
  w?: string;
  label?: string;
}) {
  const [cssValue, setCssValue] = React.useState<ParsedCSSMeasure>(
    parseCSSMeasure(initialValue)
  );

  // For some reason our tract sizers will sometimes try and pass this undefined
  // so we need to guard against that at run time
  if (initialValue === undefined) return null;
  return (
    <div
      className={classes.wrapper}
      aria-label={label}
      onBlur={(e) => {
        const blurOutsideComponent = !e.currentTarget.contains(e.relatedTarget);
        // Only trigger submit if the user has focused outside of the input.
        // This means that going from the count to the unit input doesn't count
        if (blurOutsideComponent) onChange(deparseCSSMeasure(cssValue));
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          // Submits on pressing of enter
          e.preventDefault();
          onChange(deparseCSSMeasure(cssValue));
        }
      }}
    >
      <input
        aria-label="value-count"
        type="number"
        disabled={cssValue.unit === "auto"}
        value={cssValue.count ?? ""}
        min={0}
        onChange={(e) => {
          if (cssValue.unit === "auto") {
            console.error("How did you change the count of an auto unit?");
            return;
          }

          setCssValue({ unit: cssValue.unit, count: Number(e.target.value) });
        }}
      />
      <select
        aria-label="value-unit"
        name="value-unit"
        value={cssValue.unit}
        onChange={(e) => {
          const oldUnit = cssValue.unit;
          const newUnit = e.target.value as CSSUnits;

          if (newUnit === "auto") {
            setCssValue({
              unit: newUnit,
              count: null,
            });
            return;
          }

          if (oldUnit === "auto") {
            setCssValue({ unit: newUnit, count: defaultCounts[newUnit] });
            return;
          }

          // All we're doing is changing the unit the count stays the same
          setCssValue({
            unit: newUnit,
            count: cssValue.count,
          });
        }}
      >
        {units.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    </div>
  );
}

const defaultCounts = {
  fr: 1,
  px: 10,
  rem: 1,
};
