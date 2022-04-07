import React from "react";

import type { InputWidgetCommonProps } from ".";

import inputClasses from "./Inputs.module.css";
import { OptionalCheckbox } from "./OptionalInput/OptionalInput";
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
  noLabel = false,
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

  const mainInput = (
    <input
      ref={inputElement}
      className={classes.input}
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onNewValue({ name, value: e.target.value })}
      disabled={isDisabled}
    />
  );

  return noLabel ? (
    mainInput
  ) : (
    <div className={inputClasses.container}>
      {optional ? (
        <OptionalCheckbox
          name={name}
          isDisabled={isDisabled}
          defaultValue={defaultValue}
        />
      ) : null}
      <label className={inputClasses.label} htmlFor={name}>
        {label ?? name}:
      </label>
      {mainInput}
    </div>
  );
}
