import React from "react";

import type { CSSUnitWAuto } from "./CSSMeasure";
import { CSSUnitInfo } from "./CSSUnitInfo";
import classes from "./CSSUnitInput.module.css";

export function CSSUnitChooser<AllowedUnit extends string>({
  unit,
  availableUnits,
  onChange,
}: {
  unit: AllowedUnit;
  availableUnits: AllowedUnit[];
  onChange: (unit: AllowedUnit) => void;
}) {
  return (
    <>
      <select
        className={classes.unitSelector}
        aria-label="value-unit"
        name="value-unit"
        value={unit}
        onChange={(e) => onChange(e.target.value as AllowedUnit)}
      >
        {availableUnits.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>
      <CSSUnitInfo units={availableUnits as CSSUnitWAuto[]} />
    </>
  );
}
