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
    <div className={inputClasses.container}>
      <label className={inputClasses.label} htmlFor={name}>
        {label ?? name}:
      </label>
      <div className={inputClasses.mainInput}>
        {optional ? (
          <OptionalCheckbox
            name={name}
            isDisabled={isDisabled}
            defaultValue={defaultValue}
          />
        ) : null}
        {mainInput}
      </div>
    </div>
  );
}
