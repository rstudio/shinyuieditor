import Button from "components/Inputs/Button/Button";

import type {
  ArgTypesMap,
  ArgTypesNames,
  KnownArgTypes,
  PossibleArgTypes,
} from "../ArgumentInfo";

import "./SettingsInput.scss";

import type {
  OnChangeCallback,
  SettingsInputElementProps,
} from "./SettingsInputElement";
import { SettingsInputElement } from "./SettingsInputElement";

export type SettingsUpdateAction =
  | {
      type: "UPDATE";
      value: KnownArgTypes;
    }
  | {
      type: "REMOVE";
    };

export type SettingsInputProps = {
  [T in ArgTypesNames]: {
    name: string;
    type: T;
    value?: ArgTypesMap[T]["defaultValue"];
    defaultValue: ArgTypesMap[T]["defaultValue"];
    onChange: (x: SettingsUpdateAction) => void;
    options?: ArgTypesMap[T]["options"];
    label?: string;
    requiredOrOptional?: "optional" | "required";
  };
}[ArgTypesNames];

export function SettingsInput({
  name,
  value,
  type,
  label = name,
  defaultValue,
  requiredOrOptional = "required",
  onChange,
  options,
}: SettingsInputProps) {
  const argumentIsUnset = value === undefined;
  const argumentIsOptional = requiredOrOptional === "optional";

  const setToDefault = () =>
    onChange({
      type: "UPDATE",
      value: defaultValue,
    });
  const unsetArgument = () => onChange({ type: "REMOVE" });

  const inputArgs = {
    id: name,
    type,
    value,
    onChange: (newVal) => onChange({ type: "UPDATE", value: newVal }),
    options,
  } as SettingsInputElementProps;

  return (
    <div className="SUE-SettingsInput">
      <div className="info">
        {argumentIsOptional ? (
          <input
            type="checkbox"
            checked={!argumentIsUnset}
            title={`Click to ${
              argumentIsUnset ? "set" : "unset"
            } ${name} property`}
            onChange={argumentIsUnset ? setToDefault : unsetArgument}
          />
        ) : null}

        <label htmlFor={name}>{label}</label>
      </div>
      {argumentIsUnset ? (
        argumentIsOptional ? (
          <div className="unset-input">I am unset</div>
        ) : (
          <div className="malformed-argument-value-pair">
            Required argument "{name}" not provided.
            <Button
              style={{ padding: "0.25rem 0.5rem", marginInline: "0.25rem" }}
              onClick={setToDefault}
            >
              Reset
            </Button>
          </div>
        )
      ) : (
        <SettingsInputElement {...inputArgs} />
      )}
    </div>
  );
}
