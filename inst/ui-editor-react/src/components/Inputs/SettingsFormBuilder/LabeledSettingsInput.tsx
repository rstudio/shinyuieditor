import type { KnownArgTypes, ArgumentInfo } from "./SettingsFormBuilder";
import { SettingsInput } from "./SettingsInput";

export function LabeledSettingsInput<T extends KnownArgTypes>({
  name,
  value,
  info,
  onChange,
}: {
  name: string;
  value: T;
  info: ArgumentInfo;
  onChange: (x: T) => void;
}) {
  return (
    <label className="SettingsInput" key={name}>
      {info.label} {info.optional ? " | Optional" : ""}
      {value === undefined ? (
        <span>Unset</span>
      ) : (
        <SettingsInput value={value} onChange={onChange} />
      )}
    </label>
  );
}
