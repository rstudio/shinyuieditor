import React from "react";

import { SettingsFormBuilder } from "./SettingsFormBuilder";

export default {
  title: "SettingsFormBuilder",
  component: SettingsFormBuilder,
};

const defaultSettings = {
  name: "test",
  value: 3,
};
const settingsInfo = {
  name: { default: "name default", label: "This is my name" },
  value: { default: 42, label: "This is a value" },
};

export const AutoBuild = () => {
  const [value, setValue] = React.useState(defaultSettings);

  return (
    <SettingsFormBuilder
      settings={value}
      settingsInfo={settingsInfo}
      onChange={setValue}
    />
  );
};

export const RenderProps = () => {
  const [value, setValue] = React.useState(defaultSettings);

  return (
    <SettingsFormBuilder
      settings={value}
      settingsInfo={settingsInfo}
      onChange={setValue}
      renderInputs={(Inputs) => {
        return (
          <>
            <section>
              <h2>Number inputs</h2>
              {Inputs.value}
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
