import React from "react";

import type { OnChangeCallbackArgs } from "../SettingsUpdateContext";

import { OptionalCheckbox } from "./OptionalCheckbox";

export function OptionInputWrapper({
  name,
  isDisabled,
  defaultValue,
  mainInput,
}: {
  name: string;
  isDisabled: boolean;
  defaultValue: NonNullable<OnChangeCallbackArgs["value"]>;
  mainInput: JSX.Element;
}) {
  return (
    <>
      <OptionalCheckbox
        name={name}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
      />
      {mainInput}
    </>
  );
}
