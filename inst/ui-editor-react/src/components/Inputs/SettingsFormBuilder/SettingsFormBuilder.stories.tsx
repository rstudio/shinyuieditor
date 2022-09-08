import React from "react";

import { SettingsFormBuilder } from "./SettingsFormBuilder";

export default {
  title: "SettingsFormBuilder",
  component: SettingsFormBuilder,
};

const defaultSettings = {
  name: "test",
  myNumberArg: 3,
};
const settingsInfo = {
  name: { default: "name default", label: "This is my name" },
  myNumberArg: { default: 42, label: "This is a value" },
};

export const AutoBuild = () => {
  const [value, setValue] = React.useState(defaultSettings);

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
  const [value, setValue] = React.useState(defaultSettings);

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
