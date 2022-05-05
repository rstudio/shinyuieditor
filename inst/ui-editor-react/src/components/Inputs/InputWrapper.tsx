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
}: {
  label?: string;
  name: string;
  optional?: boolean;
  isDisabled: boolean;
  defaultValue: NonNullable<OnChangeCallbackArgs["value"]>;
  mainInput: JSX.Element;
}) {
  return (
    <div className={inputClasses.container} data-disabled={isDisabled}>
      <label className={inputClasses.label} htmlFor={name}>
        {optional ? (
          <OptionalCheckbox
            name={name}
            isDisabled={isDisabled}
            defaultValue={defaultValue}
          />
        ) : null}
        {label ?? name}:
      </label>
      <div className={inputClasses.mainInput}>{mainInput}</div>
    </div>
  );
}
