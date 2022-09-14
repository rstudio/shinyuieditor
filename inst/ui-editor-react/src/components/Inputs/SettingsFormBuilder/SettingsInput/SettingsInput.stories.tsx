import React from "react";

import type { NamedList } from "components/Inputs/ListInput/NamedListInput";
import type { DropdownOption } from "components/Inputs/OptionsDropdown/DropdownSelect";
import { DEFAULT_DROPDOWN_CHOICE } from "components/Inputs/OptionsDropdown/DropdownSelect";
import type { CSSMeasure } from "CSSMeasure";

import type { SettingsUpdateAction } from "./SettingsInput";
import { SettingsInput } from "./SettingsInput";

export default {
  title: "SettingsInput",
  component: SettingsInput,
};

export const RequiredStringInput = () => {
  const [value, setValue] = React.useState("test");

  const updateValue = (action: SettingsUpdateAction) => {
    if (action.type === "UPDATE") {
      setValue(action.value as string);
    }
    // if (action.type === "REMOVE") {
    //   setValue(undefined);
    // }
  };

  return (
    <SettingsInput
      name="name"
      value={value}
      defaultValue="name default"
      type="string"
      label="This is my name"
      requiredOrOptional="required"
      onChange={updateValue}
    />
  );
};

export const OptionalNumberInput = () => {
  const [value, setValue] = React.useState<number | undefined>(10);

  const updateValue = (action: SettingsUpdateAction) => {
    if (action.type === "UPDATE") {
      setValue(action.value as number);
    }
    if (action.type === "REMOVE") {
      setValue(undefined);
    }
  };
  return (
    <SettingsInput
      name="myNumberArg"
      value={value}
      defaultValue={42}
      type="number"
      label="This is a value"
      requiredOrOptional="optional"
      onChange={updateValue}
    />
  );
};

export const MissingNonOptionalInput = () => {
  const [value, setValue] = React.useState<undefined | string>();
  const updateValue = (action: SettingsUpdateAction) => {
    if (action.type === "UPDATE") {
      setValue(action.value as string);
    }
    if (action.type === "REMOVE") {
      setValue(undefined);
    }
  };
  return (
    <SettingsInput
      name="name"
      value={value}
      defaultValue={"name default"}
      type="string"
      label="This is my name"
      requiredOrOptional="required"
      onChange={updateValue}
    />
  );
};
export const CSSInput = () => {
  const [value, setValue] = React.useState<CSSMeasure | undefined>("1rem");
  const updateValue = (action: SettingsUpdateAction) => {
    if (action.type === "UPDATE") {
      setValue(action.value as CSSMeasure);
    }
    if (action.type === "REMOVE") {
      setValue(undefined);
    }
  };
  return (
    <SettingsInput
      name="cssVal"
      value={value}
      type="cssMeasure"
      defaultValue="4rem"
      label="CSS Value"
      requiredOrOptional="required"
      onChange={updateValue}
    />
  );
};

export const MismatchedType = () => {
  const [value, setValue] = React.useState<number | undefined>(10);

  const updateValue = (action: SettingsUpdateAction) => {
    if (action.type === "UPDATE") {
      // Gotta ignore because we're deliberately breaking the type system here
      // @ts-ignore
      setValue(action.value);
    }
    if (action.type === "REMOVE") {
      setValue(undefined);
    }
  };

  return (
    // @ts-ignore
    <SettingsInput
      name="mismatchedType"
      value={value}
      type="string"
      defaultValue="default string value"
      label="Number in a string hole"
      requiredOrOptional="required"
      onChange={updateValue}
    />
  );
};
export const BooleanInput = () => {
  const [value, setValue] = React.useState<boolean>(true);

  const updateValue = (action: SettingsUpdateAction) => {
    if (action.type === "UPDATE") {
      // Gotta ignore because we're deliberately breaking the type system here
      // @ts-ignore
      setValue(action.value);
    }
  };

  return (
    <SettingsInput
      name="myBooleanVar"
      value={value}
      type="boolean"
      defaultValue={true}
      label="Boolean input"
      requiredOrOptional="required"
      onChange={updateValue}
    />
  );
};
export const ListInput = () => {
  const [value, setValue] = React.useState<NamedList>({
    a: "first",
    b: "second",
  });

  const updateValue = (action: SettingsUpdateAction) => {
    if (action.type === "UPDATE") {
      // Gotta ignore because we're deliberately breaking the type system here
      // @ts-ignore
      setValue(action.value);
    }
  };

  return (
    <SettingsInput
      name="myListVar"
      value={value}
      type="list"
      defaultValue={{}}
      label="List input"
      requiredOrOptional="required"
      onChange={updateValue}
      options={{
        newItemValue: {
          key: "new",
          value: "value",
        },
      }}
    />
  );
};

export const DropdownInput = () => {
  const [value, setValue] = React.useState<DropdownOption | undefined>("a");

  const updateValue = (action: SettingsUpdateAction) => {
    if (action.type === "UPDATE") {
      // Gotta ignore because we're deliberately breaking the type system here
      // @ts-ignore
      setValue(action.value);
    }
    if (action.type === "REMOVE") {
      setValue(undefined);
    }
  };

  return (
    <SettingsInput
      name="myDropdown"
      value={value}
      type="optionsDropdown"
      defaultValue={DEFAULT_DROPDOWN_CHOICE}
      label="Dropdown input"
      requiredOrOptional="optional"
      onChange={updateValue}
      options={{
        choices: ["b", "a", "c"],
      }}
    />
  );
};
