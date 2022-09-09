import type {
  ArgumentInfo,
  PossibleArgTypes,
} from "./constructInputComponents";
import { SettingsInput } from "./SettingsInput";

export function LabeledSettingsInput({
  name,
  value,
  info: { label, optional, defaultValue },
  onChange,
}: {
  name: string;
  value: PossibleArgTypes;
  info: ArgumentInfo;
  onChange: (x: PossibleArgTypes) => void;
}) {
  const argumentIsUnset = value === undefined;

  // debugger;

  return (
    <label className="SettingsInput" key={name}>
      {optional ? (
        <OptionalCheckbox
          name={name}
          isDisabled={argumentIsUnset}
          onChange={(enabled) => {
            onChange(enabled ? defaultValue : undefined);
          }}
        />
      ) : null}
      {label}
      {argumentIsUnset ? (
        <span>I am unset</span>
      ) : (
        <SettingsInput value={value} onChange={onChange} />
      )}
    </label>
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
