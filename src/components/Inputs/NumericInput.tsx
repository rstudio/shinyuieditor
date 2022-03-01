import React from "react";

import inputClasses from "./Inputs.module.css";
import classes from "./NumericInput.module.css";

export default function NumericInput({
  label,
  ariaLabel,
  value,
  min = 0,
  max = Infinity,
  onChange,
  disabled = false,
}: {
  label?: string;
  ariaLabel?: string;
  value?: number;
  min?: number;
  max?: number;
  onChange: (newVal: number) => void;
  disabled?: boolean;
}) {
  const incrementCount = React.useCallback(
    (amount: number = 1, largeIncrement: boolean = false) => {
      const scale = largeIncrement ? 10 : 1;
      const oldVal = value ?? 0;
      onChange(Math.min(Math.max(oldVal + amount * scale, min), max));
    },
    [max, min, onChange, value]
  );

  const mainInput = (
    <input
      className={classes.numericInput}
      aria-label={ariaLabel ?? label ?? "Numeric Input"}
      type="number"
      disabled={disabled}
      // The toString() here makes sure that we dont get prefixed zeros
      // anytime the user deletes back to nothing and then types a new value.
      // Otherwise the comparison that react does to know to update the value
      // would consider `02` equal to `2`
      value={value?.toString() ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
      min={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        // If the user is holding the shift key while incrementing, go by
        // increments of 10
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          // Ignore the default otherwise we'd be adding 11 on each press
          e.preventDefault();
          incrementCount(e.key === "ArrowUp" ? 1 : -1, e.shiftKey);
        }
      }}
    />
  );

  return label !== undefined ? (
    <div className={inputClasses.container}>
      <label className={inputClasses.label}>{label}:</label>
      {mainInput}
    </div>
  ) : (
    mainInput
  );
}
