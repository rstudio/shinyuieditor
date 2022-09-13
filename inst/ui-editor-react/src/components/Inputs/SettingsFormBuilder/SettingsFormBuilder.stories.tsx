import React from "react";

import omit from "just-omit";

import type { SettingsInfo } from "./ArgumentInfo";
import { SettingsFormBuilder } from "./SettingsFormBuilder";
import type { SettingsUpdateAction } from "./SettingsInput/SettingsInput";

export default {
  title: "SettingsFormBuilder",
  component: SettingsFormBuilder,
};

const settingsInfo: SettingsInfo = {
  name: {
    defaultValue: "name default",
    label: "String argument",
    type: "string",
  },
  myNumberArg: {
    defaultValue: 42,
    label: "Optional number argument",
    requiredOrOptional: "optional",
    type: "number",
  },
  myCSSArg: {
    type: "cssMeasure",
    label: "I am a css measure",
    defaultValue: "1rem",
    requiredOrOptional: "optional",
  },
};

export const AutoBuild = () => {
  const [value, setValue] = React.useState({
    name: "test",
    myNumberArg: 3,
    iAmUnknown: "unknown value",
  });

  const handleSettingsChange = (key: string, action: SettingsUpdateAction) => {
    if (action.type === "UPDATE") {
      setValue((old) => ({ ...old, [key]: action.value }));
    }

    if (action.type === "REMOVE") {
      setValue((old) => {
        return omit(old, [key]) as typeof old;
      });
    }
  };
  React.useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <SettingsFormBuilder
      settings={value}
      settingsInfo={settingsInfo}
      onSettingsChange={handleSettingsChange}
    />
  );
};

export const RenderProps = () => {
  const [value, setValue] = React.useState({
    name: "test",
    myNumberArg: 3,
  });

  const handleSettingsChange = (key: string, action: SettingsUpdateAction) => {
    console.log(`Updating ${key}`, action);

    if (action.type === "UPDATE") {
      setValue((old) => ({ ...old, [key]: action.value }));
    }

    if (action.type === "REMOVE") {
      setValue((old) => {
        return omit(old, [key]) as typeof old;
      });
    }
  };

  return (
    <SettingsFormBuilder
      settings={value}
      settingsInfo={settingsInfo}
      onSettingsChange={handleSettingsChange}
      renderInputs={({ inputs, unknownArguments }) => {
        return (
          <>
            <section>
              <h2>Number inputs</h2>
              {inputs.myNumberArg}
            </section>
            <section>
              <h2>Text Inputs</h2>
              {inputs.name}
            </section>
            {unknownArguments ? (
              <section>
                <h3>Unknown arguments</h3>
                {unknownArguments}
              </section>
            ) : null}
          </>
        );
      }}
    />
  );
};
