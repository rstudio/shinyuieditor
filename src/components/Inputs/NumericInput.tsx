import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

export function NumericInput({
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
