import {
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import * as React from "react";
import { parseCSSMeasure, updateCssUnit } from "utils/css-helpers";
import { CSSMeasure } from "../GridTypes";

type CSSUnits = "fr" | "px" | "rem" | "auto";

export function CSSUnitInput({
  value,
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
  // For some reason our tract sizers will sometimes try and pass this undefined
  // so we need to guard against that at run time
  if (value === undefined) return null;
  const parsedValue = parseCSSMeasure(value);
  const updateCount = (newCount: number) =>
    onChange(updateCssUnit(value, { count: newCount }));
  const updateUnit = (newUnit: CSSUnits) =>
    onChange(updateCssUnit(value, { unit: newUnit }));

  // Clamp the width so we dont get super ugly wide inputs
  const width = `min(${w}, ${widestAllowed})`;
  return (
    <HStack
      spacing="1px"
      align="center"
      w={width}
      // For some reason grid items really need a min width to not overflow
      minW={width}
      minH="100%"
      aria-label={label}
      // Shrink the dropdown icon. These styles need to be seperate from the
      // Select component's css because the icon is technically a sibling so it
      // cant be targeted from within the selector
      css={{
        ".chakra-select__icon-wrapper": {
          width: "1rem",
          right: "0",
        },
      }}
    >
      <NumberInput
        bg="white"
        size="sm"
        value={parsedValue.unit !== "auto" ? parsedValue.count : undefined}
        aria-label="value-count"
        onChange={(e) => updateCount(Number(e))}
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
          updateUnit(e.target.value as CSSUnits);
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
    </HStack>
  );
}
// How wide the input element is allowed to get before being clamped
const widestAllowed = "150px";
