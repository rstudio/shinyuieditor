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
import { parseCSSMeasure } from "../css-helpers";
import { CSSMeasure } from "../GridTypes";

type CSSUnits = "fr" | "px" | "rem" | "auto";

export function CSSUnitInput({
  value,
  onChange,
  units = ["fr", "px", "rem", "auto"],
  w = "150px",
}: {
  value: CSSMeasure;
  units?: CSSUnits[];
  onChange: (value: CSSMeasure) => void;
  w?: string;
}) {
  const { count: initialCount, unit: initialUnit } = parseCSSMeasure(value);
  const [count, setCount] = React.useState(initialCount);
  const [unit, setUnit] = React.useState(initialUnit);

  React.useEffect(() => {
    if (unit === "auto") {
      onChange("auto");
      return;
    }

    onChange(`${count}${unit}`);
  }, [count, unit, onChange]);

  return (
    <HStack
      spacing="1px"
      align="center"
      w={w}
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
        value={unit !== "auto" ? count : undefined}
        aria-label="value-count"
        onChange={(e) => setCount(Number(e))}
        isDisabled={unit === "auto"}
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
        value={unit}
        aria-label="value-unit"
        iconSize="10px"
        onChange={(e) => {
          setUnit(e.target.value as CSSUnits);
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
