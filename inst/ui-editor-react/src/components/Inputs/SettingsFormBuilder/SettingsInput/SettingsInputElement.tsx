import { BooleanInputSimple } from "components/Inputs/BooleanInput/BooleanInputSimple";
import { CSSUnitInputSimple } from "components/Inputs/CSSUnitInput/CSSUnitInputSimple";

import type {
  ArgTypesMap,
  ArgTypesNames,
  KnownArgTypes,
} from "../ArgumentInfo";

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

export function SettingsInputElement({
  type,
  id,
  value,
  onChange,
  options,
}: SettingsInputElementProps) {
  if (type === "string") {
    return (
      <StringInput
        id={id}
        value={value}
        onChange={(newValue) => onChange(newValue)}
      />
    );
  }

  if (type === "number") {
    return (
      <input
        id={id}
        type="number"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(Number(e.target.value));
        }}
      />
    );
  }

  if (type === "cssMeasure") {
    return (
      <CSSUnitInputSimple
        id={id}
        value={value}
        onChange={onChange}
        units={options?.units}
      />
    );
  }

  if (type === "boolean") {
    return <BooleanInputSimple id={id} value={value} onChange={onChange} />;
  }

  return (
    <div>I don't know how to render the input of type {type} yet! Sorry.</div>
  );
}

function StringInput({
  id,
  value,
  onChange,
}: Pick<
  Required<SettingsInputElementPropsByType["string"]>,
  "id" | "value" | "onChange"
>) {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
      }}
    />
  );
}
