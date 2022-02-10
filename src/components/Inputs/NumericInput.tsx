import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";
import classes from "./NumericInput.module.css";
import inputClasses from "./Inputs.module.css";

export function NumericInputChakra({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: number;
  onChange: (newVal: number) => void;
}) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <NumberInput
        value={value}
        onChange={(val) => onChange(Number(val))}
        minHeight="30px"
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}

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
    <div className={classes.countContainer}>
      <input
        className={classes.countInput}
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
      <div className={classes.incrementerArrows}>
        <div
          aria-label="increase count"
          onClick={(e) => incrementCount(1, e.shiftKey)}
        >
          &#5169;
        </div>
        <div
          aria-label="decrease count"
          onClick={(e) => incrementCount(-1, e.shiftKey)}
        >
          &#5167;
        </div>
      </div>
    </div>
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
