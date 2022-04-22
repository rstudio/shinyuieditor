import React from "react";

import type { InputWidgetCommonProps } from ".";

import { InputWrapper } from "./InputWrapper";
import type { OnChangeCallback } from "./SettingsUpdateContext";
import { useOnChange } from "./SettingsUpdateContext";
import classes from "./TextInput.module.css";

export function TextInputSimple({
  value,
  ariaLabel,
  onChange,
  autoFocus,
  disabled = false,
  placeholder,
}: {
  value?: string;
  ariaLabel?: string;
  onChange: (x: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
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
    <input
      ref={inputElement}
      className={classes.input}
      type="text"
      aria-label={ariaLabel ?? "Text Input"}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
}

export function TextInput({
  name,
  label,
  value,
  placeholder,
  onChange,
  autoFocus = false,
  optional = false,
  defaultValue = "my-text",
}: InputWidgetCommonProps<string> & {
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const onNewValue = useOnChange(onChange as OnChangeCallback);

  const isDisabled = value === undefined;

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
    <InputWrapper
      name={name}
      label={label}
      optional={optional}
      isDisabled={isDisabled}
      defaultValue={defaultValue}
      mainInput={
        <TextInputSimple
          ariaLabel={"input for " + name}
          value={value}
          placeholder={placeholder}
          onChange={(x) => onNewValue({ name, value: x })}
          autoFocus={autoFocus}
          disabled={isDisabled}
        />
      }
    />
  );
}
