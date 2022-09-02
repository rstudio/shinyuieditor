import React from "react";

import type { InputWidgetCommonProps, InputWidgetCommonPropsOld } from "..";
import { InputWrapper } from "../InputWrapper";
import type { OnChangeCallback } from "../SettingsUpdateContext";
import { useOnChange } from "../SettingsUpdateContext";

import classes from "./TextInput.module.css";

export function TextInputSimple({
  value,
  ariaLabel,
  onChange,
  autoFocus,
  disabled = false,
  placeholder,
  name,
}: {
  value?: string;
  ariaLabel?: string;
  onChange: (x: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  name: string;
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
      name={name}
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

export function TextInputOld({
  name,
  label,
  value,
  placeholder,
  onChange,
  autoFocus = false,
  optional = false,
  defaultValue = "my-text",
}: InputWidgetCommonPropsOld<string> & {
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
      width_setting="full"
      mainInput={
        <TextInputSimple
          name={name}
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

export function TextInputSafe<T extends object>({
  name,
  label,
  allValues,
  placeholder,
  onChange,
  autoFocus = false,
  optional = false,
  defaultValue = "my-text",
}: InputWidgetCommonProps<T, string> & {
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const value = allValues[name] as string;
  const argName = name as string;
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
      name={argName}
      label={label}
      optional={optional}
      isDisabled={isDisabled}
      defaultValue={defaultValue}
      width_setting="full"
      mainInput={
        <TextInputSimple
          name={argName}
          ariaLabel={"input for " + argName}
          value={value}
          placeholder={placeholder}
          onChange={(x) => onNewValue({ name: argName, value: x })}
          autoFocus={autoFocus}
          disabled={isDisabled}
        />
      }
    />
  );
}
