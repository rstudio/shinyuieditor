import * as React from "react";
import {
  deparseCSSMeasure,
  parseCSSMeasure,
  ParsedCSSMeasure,
} from "utils/css-helpers";
import { CSSMeasure } from "../../GridTypes";
import classes from "./CSSUnitInput.module.css";
import inputClasses from "./Inputs.module.css";

type CSSUnits = "fr" | "px" | "rem" | "auto";

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

  const incrementCount = React.useCallback(
    (amount: number = 1, largeIncrement: boolean = false) => {
      setCssValue((oldCss) => {
        if (oldCss.unit === "auto") return oldCss;

        const scale = largeIncrement ? 10 : 1;
        return {
          unit: oldCss.unit,
          count: Math.max(oldCss.count + amount * scale, 0),
        };
      });
    },
    []
  );

  const handleArrowKeys = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // If the user is holding the shift key while incrementing, go by
      // increments of 10
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        // Ignore the default otherwise we'd be adding 11 on each press
        e.preventDefault();
        incrementCount(e.key === "ArrowUp" ? 1 : -1, e.shiftKey);
      }
    },
    [incrementCount]
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
    incrementCount,
    handleArrowKeys,
    updateUnit,
  };
}

type CSSUnitInputProps = {
  value: CSSMeasure;
  units?: CSSUnits[];
  onChange: (value: CSSMeasure) => void;
  name?: string;
};

export function CSSUnitInput({
  value: initialValue,
  onChange,
  units = ["fr", "px", "rem", "auto"],
  name,
}: CSSUnitInputProps) {
  const { cssValue, updateCount, updateUnit, handleArrowKeys, incrementCount } =
    useCSSUnitState(initialValue);

  // For some reason our tract sizers will sometimes try and pass this undefined
  // so we need to guard against that at run time
  if (initialValue === undefined) return null;
  return (
    <div
      className={classes.wrapper}
      aria-label={name ?? "Css Unit Input"}
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
      <div className={classes.countContainer}>
        <input
          className={classes.countInput}
          aria-label="value-count"
          type="number"
          disabled={cssValue.unit === "auto"}
          // The toString() here makes sure that we dont get prefixed zeros
          // anytime the user deletes back to nothing and then types a new value.
          // Otherwise the comparison that react does to know to update the value
          // would consider `02` equal to `2`
          value={cssValue.count?.toString() ?? ""}
          onChange={(e) => {
            const newCount = Number(e.target.value);
            updateCount(newCount);
          }}
          min={0}
          onKeyDown={handleArrowKeys}
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
};

export function LabeledCSSUnitInput({
  label,
  ...props
}: CSSUnitInputProps & { label: string }) {
  return (
    <div className={inputClasses.container}>
      <label className={inputClasses.label}>{label}:</label>
      <CSSUnitInput {...props} />
    </div>
  );
}
