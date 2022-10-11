import React from "react";

import {
  alignTextCenter,
  alignTextLeft,
  alignTextRight,
} from "components/Icons";
import type { CSSMeasure } from "components/Inputs/CSSUnitInput/CSSMeasure";
import type { NamedList } from "components/Inputs/ListInput/NamedListInput";
import type { DropdownOption } from "components/Inputs/OptionsDropdown/DropdownSelect";
import { DEFAULT_DROPDOWN_CHOICE } from "components/Inputs/OptionsDropdown/DropdownSelect";
import type { RadioOption } from "components/Inputs/RadioInputs/RadioInputsSimple";
import { DEFAULT_RADIO_CHOICE } from "components/Inputs/RadioInputs/RadioInputsSimple";

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
      inputType="string"
      label="This is my name"
      onUpdate={updateValue}
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
      inputType="number"
      label="This is a value"
      optional={true}
      onUpdate={updateValue}
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
      inputType="string"
      label="This is my name"
      onUpdate={updateValue}
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
      inputType="cssMeasure"
      defaultValue="4rem"
      label="CSS Value"
      onUpdate={updateValue}
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
      inputType="string"
      defaultValue="default string value"
      label="Number in a string hole"
      onUpdate={updateValue}
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
      inputType="boolean"
      defaultValue={true}
      label="Boolean input"
      onUpdate={updateValue}
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
      inputType="list"
      defaultValue={{}}
      label="List input"
      onUpdate={updateValue}
      newItemValue={{
        key: "new",
        value: "value",
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
      inputType="dropdown"
      defaultValue={DEFAULT_DROPDOWN_CHOICE}
      label="Dropdown input"
      optional={true}
      onUpdate={updateValue}
      choices={["b", "a", "c"]}
    />
  );
};

const horizontalAlignOptions = {
  start: { icon: alignTextLeft, label: "left" },
  center: { icon: alignTextCenter, label: "center" },
  end: { icon: alignTextRight, label: "right" },
};
export const RadioInput = () => {
  const [value, setValue] = React.useState<RadioOption | undefined>("center");

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
      name="myRadio"
      value={value}
      inputType="radio"
      defaultValue={DEFAULT_RADIO_CHOICE}
      label="Radio inputs"
      optional={true}
      onUpdate={updateValue}
      choices={horizontalAlignOptions}
    />
  );
};
