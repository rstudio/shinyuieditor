import Checkbox from "../Checkbox";
import { useOnChange } from "../SettingsUpdateContext";

export function OptionalCheckbox<T extends string | number | undefined>({
  name,
  isDisabled,
  defaultValue,
}: {
  name: string;
  isDisabled: boolean;
  defaultValue: T;
}) {
  const onNewValue = useOnChange();

  return (
    <Checkbox
      isChecked={!isDisabled}
      title={`Set ${name} value?`}
      onChange={(isTrue) => {
        onNewValue({ name, value: isTrue ? defaultValue : undefined });
      }}
    />
  );
}
