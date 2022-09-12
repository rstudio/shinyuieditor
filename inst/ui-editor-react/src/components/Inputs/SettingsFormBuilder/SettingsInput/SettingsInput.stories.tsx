import React from "react";

import type { SettingsInfo } from "../constructInputComponents";

import type { SettingsOnChangeCallback } from "./SettingsInput";
import { SettingsInput } from "./SettingsInput";

export default {
  title: "SettingsInput",
  component: SettingsInput,
};

const settingsInfo: SettingsInfo = {
  name: { defaultValue: "name default", label: "This is my name" },
  myNumberArg: {
    defaultValue: 42,
    label: "This is a value",
    requiredOrOptional: "optional",
  },
};

export const RequiredStringInput = () => {
  const [value, setValue] = React.useState("test");

  return (
    <SettingsInput
      name="name"
      value={value}
      info={settingsInfo["name"]}
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
      info={settingsInfo["myNumberArg"]}
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
      info={settingsInfo["name"]}
      onChange={setValue as SettingsOnChangeCallback}
    />
  );
};
