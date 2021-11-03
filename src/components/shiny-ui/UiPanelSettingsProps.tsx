import {
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

export type UiPanelSettingsProps<UiPanelProps> = {
  startingSettings: UiPanelProps;
  onUpdate: (newSettings: UiPanelProps) => void;
};

export function EmptySettings<T>(opts: UiPanelSettingsProps<T>) {
  return <p>To Be Filled</p>;
}

export const SettingsPanelHolder = styled.div({
  padding: "1rem",
});

export function TextInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (newVal: string) => void;
}) {
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <Input value={value} onChange={(val) => onChange(val.target.value)} />
    </>
  );
}

export function NumericInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (newVal: number) => void;
}) {
  return (
    <>
      <FormLabel>{label}</FormLabel>

      <NumberInput
        defaultValue={value}
        onChange={(val) => onChange(Number(val))}
        minHeight="30px"
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );
}
