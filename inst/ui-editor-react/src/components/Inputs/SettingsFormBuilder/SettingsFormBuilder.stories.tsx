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
export const Primary = () => {
  const [value, setValue] = React.useState(defaultSettings);

  return (
    <div>
      <SettingsFormBuilder
        settings={value}
        settingsInfo={settingsInfo}
        onChange={setValue}
      />
    </div>
  );
};
