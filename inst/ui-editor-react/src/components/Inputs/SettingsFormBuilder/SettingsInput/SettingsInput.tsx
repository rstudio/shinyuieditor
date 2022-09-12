import type {
  ArgumentInfo,
  PossibleArgTypes,
} from "../constructInputComponents";

import { SettingsInputElement } from "./SettingsInputElement";

export type SettingsOnChangeCallback = (x: PossibleArgTypes) => void;
type SettingsInputProps = {
  name: string;
  value: PossibleArgTypes;
  info: ArgumentInfo;
  onChange: SettingsOnChangeCallback;
};

export function SettingsInput({
  name,
  value,
  info: { label, defaultValue, requiredOrOptional },
  onChange,
}: SettingsInputProps) {
  const argumentIsUnset = value === undefined;

  return (
    <div>
      {requiredOrOptional === "optional" ? (
        <OptionalCheckbox
          name={name}
          isDisabled={argumentIsUnset}
          onChange={(enabled) => {
            onChange(enabled ? defaultValue : undefined);
          }}
        />
      ) : null}

      <label className="SettingsInput" key={name}>
        {label}
        {argumentIsUnset ? (
          <span>I am unset</span>
        ) : (
          <SettingsInputElement value={value} onChange={onChange} />
        )}
      </label>
    </div>
  );
}

export function OptionalCheckbox({
  name,
  isDisabled,
  onChange,
}: {
  name: string;
  isDisabled: boolean;
  onChange: (enabled: boolean) => void;
}) {
  const effectDescription = `Click to ${
    isDisabled ? "set" : "unset"
  } ${name} property`;

  return (
    <input
      aria-label={effectDescription}
      type="checkbox"
      checked={!isDisabled}
      title={effectDescription}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
    />
  );
}
