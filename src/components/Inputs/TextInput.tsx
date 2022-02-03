import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export function TextInputChakra({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (newVal: string) => void;
}) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input value={value} onChange={(val) => onChange(val.target.value)} />
    </FormControl>
  );
}
