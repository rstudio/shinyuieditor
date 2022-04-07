import React from "react";

import inputClasses from "./Inputs.module.css";
import classes from "./NumericInput.module.css";
import { OptionalCheckbox } from "./OptionalInput/OptionalInput";
import type { OnChangeCallback } from "./SettingsUpdateContext";
import { useOnChange } from "./SettingsUpdateContext";

export default function NumericInput({
  name,
  ariaLabel,
  value,
  min = 0,
  max = Infinity,
  onChange,
  noLabel = false,
  optional = false,
  defaultValue = 1,
}: {
  name: string;
  value?: number;
  ariaLabel?: string;
  min?: number;
  max?: number;
  onChange?: (x: { name: string; value: number }) => void;
  noLabel?: boolean;
  optional?: boolean;
  defaultValue?: number;
}) {
  const onNewValue = useOnChange(onChange as OnChangeCallback);

  const incrementCount = React.useCallback(
    (amount: number = 1, largeIncrement: boolean = false) => {
      const scale = largeIncrement ? 10 : 1;
      const oldVal = value ?? 0;
      const newValue = Math.min(Math.max(oldVal + amount * scale, min), max);
      onNewValue({ name, value: newValue });
    },
    [max, min, name, onNewValue, value]
  );

  const isDisabled = value === undefined;

  const mainInput = (
    <input
      className={classes.numericInput}
      aria-label={ariaLabel ?? name ?? "Numeric Input"}
      type="number"
      disabled={isDisabled}
      // The toString() here makes sure that we dont get prefixed zeros
      // anytime the user deletes back to nothing and then types a new value.
      // Otherwise the comparison that react does to know to update the value
      // would consider `02` equal to `2`
      value={value?.toString() ?? ""}
      onChange={(e) => onNewValue({ name, value: Number(e.target.value) })}
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

  return noLabel ? (
    mainInput
  ) : (
    <div className={inputClasses.container}>
      {optional ? (
        <OptionalCheckbox
          name={name}
          isDisabled={isDisabled}
          defaultValue={defaultValue}
        />
      ) : null}
      <label className={inputClasses.label}>{name}:</label>
      {mainInput}
    </div>
  );
}
