import { BooleanInputSimple } from "components/Inputs/BooleanInput/BooleanInputSimple";
import { CSSUnitInputSimple } from "components/Inputs/CSSUnitInput/CSSUnitInputSimple";
import { NamedListInputSimple } from "components/Inputs/ListInput/NamedListInputSimple";
import { DropdownSelect } from "components/Inputs/OptionsDropdown/DropdownSelect";
import { RadioInputsSimple } from "components/Inputs/RadioInputs/RadioInputsSimple";

import type {
  ArgTypesMap,
  ArgTypesNames,
  KnownArgTypes,
} from "../ArgumentInfo";

import { NumberInput } from "./NumberInput";
import { StringInput } from "./StringInput";

/**
 * Due to dynamics of types the on change callback is a very general purpose
 * function that can take any of our input types as arguments. Type narrowing is
 * not really beneficial here since we already know the type and the callback is
 * generated by the code not provided by the user.
 */
export type OnChangeCallback = (newValue: KnownArgTypes) => void;

type SettingsInputElementPropsByType = {
  [T in ArgTypesNames]: {
    id: string;
    type: T;
    value: ArgTypesMap[T]["defaultValue"];
    onChange: OnChangeCallback;
    options: ArgTypesMap[T]["options"];
  };
};

export type SettingsInputElementProps =
  SettingsInputElementPropsByType[keyof ArgTypesMap];

const inputComps = {
  string: StringInput,
  number: NumberInput,
  cssMeasure: CSSUnitInputSimple,
  boolean: BooleanInputSimple,
  list: NamedListInputSimple,
  optionsDropdown: DropdownSelect,
  radioInput: RadioInputsSimple,
};

export function SettingsInputElement(args: SettingsInputElementProps) {
  const { type, id, value, onChange, options } = args;

  if (!(type in inputComps)) {
    return (
      <div>I don't know how to render the input of type {type} yet! Sorry.</div>
    );
  }

  if (type === "string") {
    return <inputComps.string id={id} value={value} onChange={onChange} />;
  }

  if (type === "number") {
    return <inputComps.number id={id} value={value} onChange={onChange} />;
  }

  if (type === "cssMeasure") {
    return (
      <inputComps.cssMeasure
        id={id}
        value={value}
        onChange={onChange}
        units={options?.units}
      />
    );
  }

  if (type === "boolean") {
    return <inputComps.boolean id={id} value={value} onChange={onChange} />;
  }

  if (type === "list") {
    return (
      <inputComps.list
        id={id}
        value={value}
        onChange={onChange}
        newItemValue={options?.newItemValue}
      />
    );
  }

  if (type === "optionsDropdown") {
    return (
      <inputComps.optionsDropdown
        id={id}
        value={value}
        onChange={onChange}
        choices={options.choices}
      />
    );
  }

  if (type === "radioInput") {
    return (
      <inputComps.radioInput
        id={id}
        value={value}
        onChange={onChange}
        choices={options.choices}
      />
    );
  }
  return (
    <div>I don't know how to render the input of type {type} yet! Sorry.</div>
  );
}
