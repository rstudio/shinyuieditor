import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import classes from "./TextInput.module.css";
import inputClasses from "./Inputs.module.css";

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
    <div className={inputClasses.container}>
      <label className={inputClasses.label} htmlFor={name}>
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
