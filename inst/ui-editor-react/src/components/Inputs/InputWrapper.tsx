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
  width_setting = "full",
}: {
  label?: string;
  name: string;
  optional?: boolean;
  isDisabled: boolean;
  fullWidth?: boolean;
  width_setting?: "full" | "fit";
  defaultValue: NonNullable<OnChangeCallbackArgs["value"]>;
  mainInput: JSX.Element;
}) {
  return (
    <label
      className={inputClasses.container}
      data-disabled={isDisabled}
      data-width-setting={width_setting}
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
