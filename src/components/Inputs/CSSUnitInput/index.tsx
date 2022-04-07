import * as React from "react";

import type { ParsedCSSMeasure } from "utils/css-helpers";
import { deparseCSSMeasure, parseCSSMeasure } from "utils/css-helpers";

import type { InputWidgetCommonProps } from "..";
import type { CSSMeasure } from "../../../CSSMeasure";
import inputClasses from "../Inputs.module.css";
import NumericInput from "../NumericInput";
import type { OnChangeCallback } from "../SettingsUpdateContext";
import { useOnChange } from "../SettingsUpdateContext";

import classes from "./CSSUnitInput.module.css";

type CSSUnits = "fr" | "px" | "rem" | "auto" | "%";

function useCSSUnitState(initialValue: CSSMeasure) {
  const [cssValue, setCssValue] = React.useState<ParsedCSSMeasure>(
    parseCSSMeasure(initialValue)
  );
  const updateCount = React.useCallback(
    (newCount: number) => {
      if (cssValue.unit === "auto") {
        console.error("How did you change the count of an auto unit?");
        return;
      }

      setCssValue({ unit: cssValue.unit, count: newCount });
    },
    [cssValue.unit]
  );

  const updateUnit = React.useCallback((newUnit: CSSUnits) => {
    // All we're doing is changing the unit the count stays the same

    setCssValue((oldCSS) => {
      const oldUnit = oldCSS.unit;
      if (newUnit === "auto") {
        return {
          unit: newUnit,
          count: null,
        };
      }

      if (oldUnit === "auto") {
        return { unit: newUnit, count: defaultCounts[newUnit] };
      }

      return { unit: newUnit, count: oldCSS.count };
    });
  }, []);

  return {
    cssValue,
    updateCount,
    updateUnit,
  };
}

type CSSUnitInputProps = {
  value: CSSMeasure;
  units?: CSSUnits[];
  onChange: (value: CSSMeasure) => void;
};

export function CSSUnitInput({
  value: initialValue,
  onChange,
  units = ["fr", "px", "rem", "auto"],
}: CSSUnitInputProps) {
  const { cssValue, updateCount, updateUnit } = useCSSUnitState(initialValue);

  // For some reason our tract sizers will sometimes try and pass this undefined
  // so we need to guard against that at run time
  if (initialValue === undefined) return null;
  return (
    <div
      className={classes.wrapper}
      aria-label={"Css Unit Input"}
      onBlur={(e) => {
        const blurOutsideComponent = !e.currentTarget.contains(e.relatedTarget);
        // Only trigger submit if the user has focused outside of the input.
        // This means that going from the count to the unit input doesn't count
        if (blurOutsideComponent) onChange(deparseCSSMeasure(cssValue));
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          // Submits on pressing of enter
          onChange(deparseCSSMeasure(cssValue));
        }
      }}
    >
      <NumericInput
        name="count"
        label="value-count"
        value={cssValue.count ?? undefined}
        onChange={({ value }) => updateCount(value)}
        min={0}
        noLabel={true}
      />

      <select
        aria-label="value-unit"
        name="value-unit"
        value={cssValue.unit}
        onChange={(e) => updateUnit(e.target.value as CSSUnits)}
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
  "%": 100,
};

export function LabeledCSSUnitInput({
  name,
  label,
  onChange,
  ...props
}: InputWidgetCommonProps<CSSMeasure> & {} & Omit<
    CSSUnitInputProps,
    "onChange"
  >) {
  const onNewValue = useOnChange(onChange as OnChangeCallback);

  return (
    <div className={inputClasses.container}>
      <label className={inputClasses.label}>{name ?? label}:</label>
      <CSSUnitInput
        {...props}
        onChange={(value) => {
          console.log("onChage", value);
          onNewValue({ name, value });
        }}
      />
    </div>
  );
}
