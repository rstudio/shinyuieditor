import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import classes from "./TextInput.module.css";
import inputClasses from "./Inputs.module.css";
import React from "react";

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
  autoFocus = false,
}: {
  name: string;
  label?: string;
  value: string;
  onChange: (x: string) => void;
  autoFocus?: boolean;
}) {
  const inputElement = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (inputElement.current && autoFocus) {
      // We need a timeout so we're sure the element is rendered before setting
      // focus. This is only neccesary for scenarios like rendering in a portal
      // but since we do that... we need it
      setTimeout(() => inputElement?.current?.focus(), 1);
    }
  }, [autoFocus]);

  return (
    <div className={inputClasses.container}>
      <label className={inputClasses.label} htmlFor={name}>
        {label ?? name}:
      </label>
      <input
        ref={inputElement}
        className={classes.input}
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
