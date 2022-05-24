import React from "react";

import inputClasses from "./Inputs.module.css";
import { OptionalCheckbox } from "./OptionalInput/OptionalCheckbox";
import type { OnChangeCallbackArgs } from "./SettingsUpdateContext";

export function InputWrapper({
  name,
  label,
  optional,
  isDisabled,
  defaultValue,
  mainInput,
  fullWidth = false,
}: {
  label?: string;
  name: string;
  optional?: boolean;
  isDisabled: boolean;
  fullWidth?: boolean;
  defaultValue: NonNullable<OnChangeCallbackArgs["value"]>;
  mainInput: JSX.Element;
}) {
  return (
    <label
      className={inputClasses.container}
      data-disabled={isDisabled}
      data-full-width={fullWidth}
    >
      <div className={inputClasses.label}>
        {optional ? (
          <OptionalCheckbox
            name={name}
            isDisabled={isDisabled}
            defaultValue={defaultValue}
          />
        ) : null}
        {label ?? name}:
      </div>
      <div className={inputClasses.mainInput}>{mainInput}</div>
    </label>
  );
}
