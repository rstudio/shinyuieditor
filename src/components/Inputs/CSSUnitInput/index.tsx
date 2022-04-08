import { deparseCSSMeasure } from "utils/css-helpers";

import type { InputWidgetCommonProps } from "..";
import type { CSSMeasure } from "../../../CSSMeasure";
import inputClasses from "../Inputs.module.css";
import NumericInput from "../NumericInput";
import type { OnChangeCallback } from "../SettingsUpdateContext";
import { useOnChange } from "../SettingsUpdateContext";

import classes from "./CSSUnitInput.module.css";
import { useCSSUnitState } from "./useCSSUnitState";

export type CSSUnits = "fr" | "px" | "rem" | "auto" | "%";

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
