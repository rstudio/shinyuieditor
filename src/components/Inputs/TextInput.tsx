import React from "react";

import inputClasses from "./Inputs.module.css";
import type { OnChangeCallback } from "./SettingsUpdateContext";
import { useOnChange } from "./SettingsUpdateContext";
import classes from "./TextInput.module.css";

export function TextInput({
  name,
  label,
  value,
  placeholder,
  onChange,
  autoFocus = false,
  disabled,
  noLabel = false,
}: {
  name: string;
  label?: string;
  value: string;
  placeholder?: string;
  onChange?: (x: { name: string; value: string }) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  noLabel?: boolean;
}) {
  const onNewValue = useOnChange(onChange as OnChangeCallback);

  const inputElement = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (inputElement.current && autoFocus) {
      // We need a timeout so we're sure the element is rendered before setting
      // focus. This is only neccesary for scenarios like rendering in a portal
      // but since we do that... we need it
      setTimeout(() => inputElement?.current?.focus(), 1);
    }
  }, [autoFocus]);

  const mainInput = (
    <input
      ref={inputElement}
      className={classes.input}
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onNewValue({ name, value: e.target.value })}
      disabled={disabled}
    />
  );

  return noLabel ? (
    mainInput
  ) : (
    <div className={inputClasses.container}>
      <label className={inputClasses.label} htmlFor={name}>
        {label ?? name}:
      </label>
      {mainInput}
    </div>
  );
}
