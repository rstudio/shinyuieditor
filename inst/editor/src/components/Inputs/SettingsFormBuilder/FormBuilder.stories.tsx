import React from "react";

import omit from "just-omit";

import type { CSSMeasure } from "../CSSUnitInput/CSSMeasure";

import { FormBuilder } from "./FormBuilder";
import type { SettingsUpdateAction } from "./SettingsInput/SettingsInput";

export default {
  title: "SettingsFormBuilder",
  component: FormBuilder,
};

export const AutoBuild = () => {
  const [value, setValue] = React.useState({
    name: "test",
    myNumberArg: 3,
    iAmUnknown: "unknown value",
    myBooleanArg: false,
  });

  const handleSettingsChange = (key: string, action: SettingsUpdateAction) => {
    if (action.type === "UPDATE") {
      setValue((old) => ({ ...old, [key]: action.value }));
    }

    if (action.type === "REMOVE") {
      setValue((old) => {
        return omit(old, key as keyof typeof old) as typeof old;
      });
    }
  };
  React.useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <FormBuilder<{
      name: string;
      myNumberArg?: number;
      myCSSArg?: CSSMeasure;
      myBooleanArg?: boolean;
    }>
      settings={value}
      settingsInfo={{
        name: {
          defaultValue: "name default",
          label: "String argument",
          inputType: "string",
        },
        myNumberArg: {
          defaultValue: 42,
          label: "Optional number argument",
          optional: true,
          inputType: "number",
        },
        myCSSArg: {
          inputType: "cssMeasure",
          label: "I am a css measure",
          defaultValue: "1rem",
          optional: true,
        },
        myBooleanArg: {
          inputType: "boolean",
          label: "I am a boolean measure",
          defaultValue: true,
          optional: true,
        },
      }}
      onSettingsChange={handleSettingsChange}
    />
  );
};
