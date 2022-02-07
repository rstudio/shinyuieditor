/** @jsxImportSource @emotion/react */

import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import * as React from "react";
import {
  parseCSSMeasure,
  ParsedCSSMeasure,
  updateCssUnit,
} from "utils/css-helpers";
import { CSSMeasure } from "../../GridTypes";

type CSSUnits = "fr" | "px" | "rem" | "auto";

function useCSSUnitState(initialValue: CSSMeasure) {
  const [value, setValue] = React.useState<CSSMeasure>(initialValue);

  const updateCount = React.useCallback(
    (newCount: number) =>
      setValue((old) => updateCssUnit(old, { count: newCount })),
    [setValue]
  );

  const updateUnit = React.useCallback(
    (newUnit: CSSUnits) =>
      setValue((old) => updateCssUnit(old, { unit: newUnit })),
    [setValue]
  );

  return {
    value,
    updateCount,
    updateUnit,
  };
}

export function CSSUnitInput({
  value: initialValue,
  onChange,
  units = ["fr", "px", "rem", "auto"],
  w = "150px",
  label = "CSS units input",
}: {
  value: CSSMeasure;
  units?: CSSUnits[];
  onChange: (value: CSSMeasure) => void;
  w?: string;
  label?: string;
}) {
  const { value, updateUnit, updateCount } = useCSSUnitState(initialValue);

  // Clamp the width so we dont get super ugly wide inputs
  const width = `min(${w}, ${widestAllowed})`;

  // For some reason our tract sizers will sometimes try and pass this undefined
  // so we need to guard against that at run time
  if (initialValue === undefined) return null;
  return (
    <div
      aria-label={label}
      onBlur={(e) => {
        const blurOutsideComponent = !e.currentTarget.contains(e.relatedTarget);
        // Only trigger submit if the user has focused outside of the input.
        // This means that going from the count to the unit input doesn't count
        if (blurOutsideComponent) onChange(value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          // Submits on pressing of enter
          e.preventDefault();
          onChange(value);
        }
      }}
      // Shrink the dropdown icon. These styles need to be seperate from the
      // Select component's css because the icon is technically a sibling so it
      // cant be targeted from within the selector
      css={{
        width,
        minWidth: width,
        display: "flex",
        flexDirection: "row",
        ".chakra-select__icon-wrapper": {
          width: "1rem",
          right: "0",
        },
      }}
    >
      <InputUI
        value={value}
        units={units}
        onNewCount={updateCount}
        onNewUnit={updateUnit}
      />
    </div>
  );
}

function InputUI({
  value,
  units,
  onNewCount,
  onNewUnit,
}: {
  value: CSSMeasure;
  units: CSSUnits[];
  onNewCount: (x: number) => void;
  onNewUnit: (newUnit: CSSUnits) => void;
}) {
  const parsedValue = parseCSSMeasure(value);

  return (
    <>
      <NumberInput
        bg="white"
        size="sm"
        value={parsedValue.unit !== "auto" ? parsedValue.count : undefined}
        aria-label="value-count"
        onChange={(e) => onNewCount(Number(e))}
        isDisabled={parsedValue.unit === "auto"}
      >
        <NumberInputStepper>
          <NumberIncrementStepper aria-label="increase count" />
          <NumberDecrementStepper aria-label="decrease count" />
        </NumberInputStepper>
        <NumberInputField />
      </NumberInput>

      <Select
        size="sm"
        w="110px"
        bg="white"
        value={parsedValue.unit}
        aria-label="value-unit"
        iconSize="10px"
        onChange={(e) => {
          onNewUnit(e.target.value as CSSUnits);
        }}
        // These are an attempt to get the select dropdown nice and compact
        css={{
          paddingInlineEnd: "0",
          paddingInlineStart: "0.5rem",
        }}
      >
        {units.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </Select>
    </>
  );
}

// How wide the input element is allowed to get before being clamped
const widestAllowed = "150px";
