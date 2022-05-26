import React from "react";

import type { InputWidgetCommonProps } from "..";
import { InputWrapper } from "../InputWrapper";
import type { OnChangeCallback } from "../SettingsUpdateContext";
import { useOnChange } from "../SettingsUpdateContext";

import classes from "./NumericInput.module.css";

export function NumericInputSimple({
  value,
  ariaLabel,
  onChange,
  min,
  max,
  disabled = false,
}: {
  value?: number;
  ariaLabel?: string;
  onChange: (x: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}) {
  const incrementCount = React.useCallback(
    (amount: number = 1, largeIncrement: boolean = false) => {
      const scale = largeIncrement ? 10 : 1;

      let newValue = (value ?? 0) + amount * scale;

      if (min) {
        newValue = Math.max(newValue, min);
      }

      if (max) {
        newValue = Math.min(newValue, max);
      }

      onChange(newValue);
    },
    [max, min, onChange, value]
  );

  return (
    <input
      className={classes.numericInput}
      aria-label={ariaLabel ?? "Numeric Input"}
      type="number"
      disabled={disabled}
      // The toString() here makes sure that we dont get prefixed zeros
      // anytime the user deletes back to nothing and then types a new value.
      // Otherwise the comparison that react does to know to update the value
      // would consider `02` equal to `2`
      value={value?.toString() ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
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
}

export default function NumericInput({
  name,
  label,
  value,
  min = 0,
  max,
  onChange,
  optional = false,
  defaultValue = 1,
  disabled = value === undefined,
}: InputWidgetCommonProps<number> & {
  min?: number;
  max?: number;
}) {
  const onNewValue = useOnChange(onChange as OnChangeCallback);

  return (
    <InputWrapper
      name={name}
      label={label}
      optional={optional}
      isDisabled={disabled}
      defaultValue={defaultValue}
      width_setting="fit"
      mainInput={
        <NumericInputSimple
          ariaLabel={label ?? name}
          disabled={disabled}
          value={value}
          onChange={(newValue) => onNewValue({ name, value: newValue })}
          min={min}
          max={max}
        />
      }
    />
  );
}
