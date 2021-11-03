import { FormLabel, Input } from "@chakra-ui/react";

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
