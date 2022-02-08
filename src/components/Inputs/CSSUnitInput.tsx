import * as React from "react";
import { parseCSSMeasure, updateCssUnit } from "utils/css-helpers";
import { CSSMeasure } from "../../GridTypes";
import classes from "./CSSUnitInput.module.css";

type CSSUnits = "fr" | "px" | "rem" | "auto";

function useCSSUnitState(initialValue: CSSMeasure) {
  const [value, setValue] = React.useState<CSSMeasure>(initialValue);

  const updateCount = React.useCallback(
    (newCount: number) =>
      setValue((old) => updateCssUnit(old, { count: newCount })),
    [setValue]
  );

  const updateUnit = React.useCallback(
    (newUnit: CSSUnits) =>
      setValue((old) => updateCssUnit(old, { unit: newUnit })),
    [setValue]
  );

  return {
    value,
    updateCount,
    updateUnit,
  };
}

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
  const { value, updateUnit, updateCount } = useCSSUnitState(initialValue);

  const parsedValue = parseCSSMeasure(value);

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
        if (blurOutsideComponent) onChange(value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          // Submits on pressing of enter
          e.preventDefault();
          onChange(value);
        }
      }}
    >
      <input
        aria-label="value-count"
        type="number"
        disabled={parsedValue.unit === "auto"}
        value={parsedValue.count ?? ""}
        onChange={(e) => {
          updateCount(Number(e.target.value));
        }}
      />
      <select
        aria-label="value-unit"
        name="value-unit"
        value={parsedValue.unit}
        onChange={(e) => {
          updateUnit(e.target.value as CSSUnits);
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
