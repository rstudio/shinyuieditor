import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import classes from "./TextInput.module.css";

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

export function TextInput({
  name,
  label,
  value,
  onChange,
}: {
  name: string;
  label?: string;
  value: string;
  onChange: (x: string) => void;
}) {
  return (
    <div className={classes.container}>
      <label className={classes.label} htmlFor={name}>
        {label ?? name}:
      </label>
      <input
        className={classes.input}
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
