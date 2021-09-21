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

type CSSUnits = "fr" | "px" | "rem" | "auto";

export function CSSUnitInput({
  value,
  units = ["fr", "px", "rem", "auto"],
  h = "30px",
}: {
  value: number;
  units?: CSSUnits[];
  h?: string;
}) {
  return (
    <HStack spacing="1px" align="center">
      <NumberInput size="sm" defaultValue={value}>
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
        <NumberInputField />
      </NumberInput>

      <Select size="sm" variant="filled">
        {units.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </Select>
    </HStack>
  );
}
