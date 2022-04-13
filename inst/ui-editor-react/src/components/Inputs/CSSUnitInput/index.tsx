import { deparseCSSMeasure } from "utils/css-helpers";

import type { InputWidgetCommonProps } from "..";
import type { CSSMeasure } from "../../../CSSMeasure";
import inputClasses from "../Inputs.module.css";
import NumericInput from "../NumericInput";
import { OptionalCheckbox } from "../OptionalInput/OptionalInput";
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

  // For some reason our tract sizers will sometimes try and pass this undefined
  // so we need to guard against that at run time
  if (initialValue === undefined && !disabled) {
    return null;
  }

  const countIsDisabled = disabled || cssValue.count === null;

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
        value={countIsDisabled ? undefined : cssValue.count}
        disabled={countIsDisabled}
        onChange={({ value }) => updateCount(value)}
        min={0}
        noLabel={true}
      />

      <select
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

  const mainInput = (
    <CSSUnitInput
      value={value ?? defaultValue}
      {...props}
      disabled={isDisabled}
      onChange={(value) => {
        onNewValue({ name, value });
      }}
    />
  );
  return (
    <div className={inputClasses.container}>
      {optional ? (
        <OptionalCheckbox
          name={name}
          isDisabled={isDisabled}
          defaultValue={defaultValue}
        />
      ) : null}
      <label className={inputClasses.label}>{name ?? label}:</label>
      {mainInput}
    </div>
  );
}
