import Button from "components/Inputs/Button/Button";

import type { KnownArgTypes, PossibleArgTypes } from "../ArgumentInfo";

import "./SettingsInput.scss";

import type { SettingsInputElementProps } from "./SettingsInputElement";
import { SettingsInputElement } from "./SettingsInputElement";

export type SettingsOnChangeCallback = (x: PossibleArgTypes) => void;

type SettingsInputProps = Omit<SettingsInputElementProps, "id" | "value"> & {
  name: string;
  value?: KnownArgTypes;
  defaultValue: KnownArgTypes;
  label: string;
  requiredOrOptional: "optional" | "required";
};

export function SettingsInput({
  name,
  value,
  type,
  label,
  defaultValue,
  requiredOrOptional,
  onChange,
  options,
}: SettingsInputProps) {
  const argumentIsUnset = value === undefined;
  const argumentIsOptional = requiredOrOptional === "optional";

  const setToDefault = () => onChange(defaultValue);
  const unsetArgument = () => onChange(undefined);

  const inputArgs = {
    id: name,
    type,
    value,
    onChange,
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
