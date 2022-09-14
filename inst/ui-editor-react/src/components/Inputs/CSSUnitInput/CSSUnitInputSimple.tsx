import React from "react";

import {
  deparseCSSMeasure,
  parseCSSMeasure,
} from "components/Inputs/CSSUnitInput/css-helpers";

import type { CSSMeasure } from "../../../CSSMeasure";
import { NumericInputSimple } from "../NumericInput/NumericInput";
import type { InputComponentProps } from "../SettingsFormBuilder/ArgumentInfo";

import type { CSSUnits } from "./index";
import { defaultCounts } from "./index";

import { CSSUnitInfo } from "./CSSUnitInfo";
import classes from "./CSSUnitInput.module.css";

export function CSSUnitInputSimple({
  id,
  value: initialValue,
  onChange,
  units = ["fr", "px", "rem", "auto"],
}: InputComponentProps<
  CSSMeasure,
  {
    units?: CSSUnits[];
  }
>) {
  const { count, unit } = parseCSSMeasure(initialValue);

  const updateCount = React.useCallback(
    (newCount?: number) => {
      if (newCount === undefined) {
        if (unit !== "auto") {
          throw new Error("Undefined count with auto units");
        }

        onChange(deparseCSSMeasure({ unit, count: null }));
        return;
      }
      if (unit === "auto") {
        // eslint-disable-next-line no-console
        console.error("How did you change the count of an auto unit?");
        return;
      }

      onChange(deparseCSSMeasure({ unit, count: newCount }));
    },
    [onChange, unit]
  );

  const updateUnit = React.useCallback(
    (newUnit: CSSUnits) => {
      if (newUnit === "auto") {
        onChange(
          deparseCSSMeasure({
            unit: newUnit,
            count: null,
          })
        );
        return;
      }

      if (unit === "auto") {
        onChange(
          deparseCSSMeasure({ unit: newUnit, count: defaultCounts[newUnit] })
        );
        return;
      }

      onChange(deparseCSSMeasure({ unit: newUnit, count: count }));
      return;
    },
    [count, onChange, unit]
  );
  const no_count = count === null;

  return (
    <div className={classes.wrapper} aria-label="Css Unit Input" id={id}>
      <NumericInputSimple
        name="value-count"
        ariaLabel="value-count"
        value={no_count ? undefined : count}
        disabled={no_count}
        onChange={updateCount}
        min={0}
      />

      <select
        className={classes.unitSelector}
        aria-label="value-unit"
        name="value-unit"
        value={unit}
        onChange={(e) => updateUnit(e.target.value as CSSUnits)}
      >
        {units.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>
      <CSSUnitInfo units={units} />
    </div>
  );
}
