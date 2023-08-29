import React from "react";

import type { InputComponentByType } from "../../../ui-node-definitions/inputFieldTypes";
import { makeLabelId } from "../../../ui-node-definitions/inputFieldTypes";
import { mergeClasses } from "../../../utils/mergeClasses";
import { NumberInputSimple } from "../NumberInput/NumberInput";

import type { CSSUnit, CSSUnitWAuto } from "./CSSMeasure";
import { deparseCSSMeasure, parseCSSMeasure } from "./CSSMeasure";
import { CSSUnitChooser } from "./CSSUnitChooser";
import classes from "./CSSUnitInput.module.css";

const defaultCounts: Record<CSSUnit, number> = {
  fr: 1,
  px: 10,
  rem: 1,
  "%": 100,
};

const stepsForUnits: Record<CSSUnitWAuto, number> = {
  fr: 0.1,
  px: 1,
  rem: 0.1,
  "%": 1,
  auto: 1,
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
      <CSSUnitInputCore
        count={count}
        unit={unit}
        disabled={no_count}
        onCountChange={updateCount}
        onUnitChange={updateUnit}
        allowedUnits={units}
      />
    </div>
  );
}

/**
 * The core display of the CSSUnitInput. This is the part that is shared between
 * the settings input used in the properties pane and the tract resizer view.
 * @returns A JSX fragment with the number input and unit chooser
 */
export function CSSUnitInputCore<AllowedUnits extends CSSUnitWAuto>({
  count,
  unit,
  disabled,
  onCountChange,
  onUnitChange,
  allowedUnits,
}: {
  count: number | null;
  unit: AllowedUnits;
  disabled?: boolean;
  onCountChange: (x: number) => void;
  onUnitChange: (x: AllowedUnits) => void;
  allowedUnits: AllowedUnits[];
}) {
  const stepSize = stepsForUnits[unit];

  return (
    <>
      <NumberInputSimple
        name="value-count"
        aria-label="value-count"
        value={count}
        disabled={disabled}
        onChange={onCountChange}
        step={stepSize}
        min={0}
      />

      <CSSUnitChooser
        unit={unit}
        availableUnits={allowedUnits}
        onChange={onUnitChange}
      />
    </>
  );
}
