import React from "react";

import { mergeClasses } from "../../../utils/mergeClasses";
import { NumberInputSimple } from "../NumberInput/NumberInput";
import type { InputComponentByType } from "ui-node-definitions/src/inputFieldTypes";
import { makeLabelId } from "ui-node-definitions/src/inputFieldTypes";

import type { CSSUnitWAuto } from "./CSSMeasure";
import { deparseCSSMeasure, parseCSSMeasure } from "./CSSMeasure";
import { CSSUnitChooser } from "./CSSUnitChooser";
import classes from "./CSSUnitInput.module.css";

const defaultCounts = {
  fr: 1,
  px: 10,
  rem: 1,
  "%": 100,
};

export function CSSUnitInput({
  id,
  label,
  value: initialValue,
  onChange,
  units = ["px", "rem", "%"],
}: InputComponentByType<"cssMeasure">) {
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
    (newUnit: CSSUnitWAuto) => {
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

  if (!units.includes(unit)) {
    // If we have the case where a unit is not in the list of available we need
    // to add it to the list of the selected unit will not display properly. We
    // could also throw here but that feels potentially more confusing that just
    // rolling with an unsupported unit
    units.push(unit);
  }

  const no_count = count === null;

  return (
    <div
      className={mergeClasses("SUE-Input", classes.wrapper)}
      aria-label={label}
      aria-labelledby={makeLabelId(id)}
    >
      <NumberInputSimple
        name="value-count"
        aria-label="value-count"
        value={count}
        disabled={no_count}
        onChange={updateCount}
        min={0}
      />

      <CSSUnitChooser
        unit={unit}
        availableUnits={units}
        onChange={updateUnit}
      />
    </div>
  );
}
