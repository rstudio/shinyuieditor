import React from "react";

import debounce from "just-debounce-it";
import { deparseCSSMeasure } from "utils/css-helpers";

import type { InputWidgetCommonProps } from "..";
import type { CSSMeasure } from "../../../CSSMeasure";
import { InputWrapper } from "../InputWrapper";
import { NumericInputSimple } from "../NumericInput/NumericInput";
import type { OnChangeCallback } from "../SettingsUpdateContext";
import { useOnChange } from "../SettingsUpdateContext";

import classes from "./CSSUnitInput.module.css";
import { useCSSUnitState } from "./useCSSUnitState";

export type CSSUnits = "fr" | "px" | "rem" | "auto" | "%";

export const defaultCounts = {
  fr: 1,
  px: 10,
  rem: 1,
  "%": 100,
};

type CSSUnitInputProps = {
  value?: CSSMeasure;
  units?: CSSUnits[];
  disabled?: boolean;
  onChange: (value: CSSMeasure) => void;
};

export function CSSUnitInput({
  value: initialValue,
  onChange,
  units = ["fr", "px", "rem", "auto"],
  disabled = false,
}: CSSUnitInputProps) {
  const { cssValue, updateCount, updateUnit } = useCSSUnitState(
    initialValue ?? "auto"
  );

  console.log("Initial value", initialValue);

  const debouncedOnChange = React.useMemo(
    () =>
      debounce((value: CSSMeasure) => {
        console.log("Calling debounced onChange for css unit input");
        onChange(value);
      }, 500),
    [onChange]
  );

  React.useEffect(() => {
    const deparsedCSS = deparseCSSMeasure(cssValue);
    if (initialValue === deparsedCSS) return;
    console.log("Calling onchange for css unit input", initialValue);
    debouncedOnChange(deparseCSSMeasure(cssValue));
  }, [cssValue, debouncedOnChange, initialValue]);

  // For some reason our tract sizers will sometimes try and pass this undefined
  // so we need to guard against that at run time
  if (initialValue === undefined && !disabled) {
    return null;
  }

  const countIsDisabled = disabled || cssValue.count === null;

  return (
    <div
      className={classes.wrapper}
      aria-label="Css Unit Input"
      // onBlur={(e) => {
      //   const blurOutsideComponent = !e.currentTarget.contains(e.relatedTarget);
      //   // Only trigger submit if the user has focused outside of the input.
      //   // This means that going from the count to the unit input doesn't count
      //   if (blurOutsideComponent) onChange(deparseCSSMeasure(cssValue));
      // }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          // Submits on pressing of enter
          onChange(deparseCSSMeasure(cssValue));
        }
      }}
    >
      <NumericInputSimple
        ariaLabel="value-count"
        value={countIsDisabled ? undefined : cssValue.count}
        disabled={countIsDisabled}
        onChange={updateCount}
        min={0}
      />

      <select
        className={classes.unitSelector}
        aria-label="value-unit"
        name="value-unit"
        value={cssValue.unit}
        disabled={disabled}
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

export function LabeledCSSUnitInput({
  name,
  label,
  onChange,
  optional,
  value,
  defaultValue = "10px",
  ...props
}: Omit<InputWidgetCommonProps<CSSMeasure>, "disabled"> &
  Omit<CSSUnitInputProps, "onChange" | "value">) {
  const onNewValue = useOnChange(onChange as OnChangeCallback);
  const isDisabled = value === undefined;

  return (
    <InputWrapper
      name={name}
      label={label}
      optional={optional}
      isDisabled={isDisabled}
      defaultValue={defaultValue}
      width_setting="fit"
      mainInput={
        <CSSUnitInput
          value={value ?? defaultValue}
          {...props}
          disabled={isDisabled}
          onChange={(value) => {
            onNewValue({ name, value });
          }}
        />
      }
    />
  );
}
