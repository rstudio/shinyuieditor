import React from "react";

import type { SettingsInfo } from "./ArgumentInfo";
import { SettingsFormBuilder } from "./SettingsFormBuilder";

export default {
  title: "SettingsFormBuilder",
  component: SettingsFormBuilder,
};

const settingsInfo: SettingsInfo = {
  name: {
    defaultValue: "name default",
    label: "This is my name",
    type: "string",
  },
  myNumberArg: {
    defaultValue: 42,
    label: "This is a value",
    requiredOrOptional: "optional",
    type: "number",
  },
};

export const AutoBuild = () => {
  const [value, setValue] = React.useState({
    name: "test",
    myNumberArg: 3,
  });

  return (
    <SettingsFormBuilder
      settings={value}
      settingsInfo={settingsInfo}
      onSettingsChange={(key, value) => {
        console.log(`Updating ${key} to ${value}`);
        setValue((old) => ({ ...old, [key]: value }));
      }}
    />
  );
};

export const RenderProps = () => {
  const [value, setValue] = React.useState({
    name: "test",
    myNumberArg: 3,
  });

  return (
    <SettingsFormBuilder
      settings={value}
      settingsInfo={settingsInfo}
      onSettingsChange={(key, value) => {
        console.log(key);
        setValue((old) => ({ ...old, [key]: value }));
      }}
      renderInputs={(Inputs) => {
        return (
          <>
            <section>
              <h2>Number inputs</h2>
              {Inputs.myNumberArg}
            </section>
            <section>
              <h2>Text Inputs</h2>
              {Inputs.name}
            </section>
          </>
        );
      }}
    />
  );
};
