import React from "react";

import type { SettingsOnChangeCallback } from "./SettingsInput";
import { SettingsInput } from "./SettingsInput";

export default {
  title: "SettingsInput",
  component: SettingsInput,
};

export const RequiredStringInput = () => {
  const [value, setValue] = React.useState("test");

  return (
    <SettingsInput
      name="name"
      value={value}
      defaultValue="name default"
      type="string"
      label="This is my name"
      requiredOrOptional="required"
      onChange={setValue as SettingsOnChangeCallback}
    />
  );
};

export const OptionalNumberInput = () => {
  const [value, setValue] = React.useState(10);

  return (
    <SettingsInput
      name="myNumberArg"
      value={value}
      defaultValue={42}
      type="number"
      label="This is a value"
      requiredOrOptional="optional"
      onChange={setValue as SettingsOnChangeCallback}
    />
  );
};

export const MissingNonOptionalInput = () => {
  const [value, setValue] = React.useState<undefined | string>();

  return (
    <SettingsInput
      name="name"
      value={value}
      defaultValue={"name default"}
      type="string"
      label="This is my name"
      requiredOrOptional="required"
      onChange={setValue as SettingsOnChangeCallback}
    />
  );
};
