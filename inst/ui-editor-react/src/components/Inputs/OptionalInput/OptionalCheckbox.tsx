import type { OnChangeCallbackArgs } from "../SettingsUpdateContext";
import { useOnChange } from "../SettingsUpdateContext";

export function OptionalCheckbox<
  T extends NonNullable<OnChangeCallbackArgs["value"]>
>({
  name,
  isDisabled,
  defaultValue,
}: {
  name: string;
  isDisabled: boolean;
  defaultValue: T;
}) {
  const onNewValue = useOnChange();

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
        onNewValue({
          name,
          value: e.target.checked ? defaultValue : undefined,
        });
      }}
    />
  );
}
