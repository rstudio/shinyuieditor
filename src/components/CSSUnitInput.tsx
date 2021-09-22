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
  h = "30px",
}: {
  value: CSSMeasure;
  units?: CSSUnits[];
  onChange: (value: CSSMeasure) => void;
  h?: string;
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
    <HStack spacing="1px" align="center">
      <NumberInput
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
        variant="filled"
        value={unit}
        aria-label="value-unit"
        onChange={(e) => {
          setUnit(e.target.value as CSSUnits);
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
