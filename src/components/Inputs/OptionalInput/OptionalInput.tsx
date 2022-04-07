import Checkbox from "../Checkbox";
import NumericInput from "../NumericInput";
import type { OnChangeCallback } from "../SettingsUpdateContext";
import { useOnChange } from "../SettingsUpdateContext";
import { TextInput } from "../TextInput";

import classes from "./styles.module.css";

type InputSettings =
  | {
      type: "number";
      value?: number;
      defaultValue: number;
      min?: number;
      max?: number;
      onChange?: (x: { name: string; value: number | undefined }) => void;
    }
  | {
      type: "string";
      value?: string;
      defaultValue: string;
      placeholder?: string;
      onChange?: (x: { name: string; value: string | undefined }) => void;
    };

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
export default function OptionalInput({
  type,
  name,
  value,
  defaultValue,
  onChange,
}: {
  name: string;
} & InputSettings) {
  const onNewValue = useOnChange(onChange as OnChangeCallback);

  const isDisabled = value === undefined;

  const inputComponent =
    type === "number" ? (
      <NumericInput
        name={name}
        value={value}
        disabled={isDisabled}
        onChange={onNewValue}
      />
    ) : (
      <TextInput
        name={name}
        label={name}
        value={value ?? ""}
        disabled={isDisabled}
        onChange={onNewValue}
      />
    );

  return (
    <div className={classes.container}>
      <Checkbox
        isChecked={!isDisabled}
        title={`Set ${name} value?`}
        onChange={(isTrue) => {
          const newValue = isTrue ? defaultValue : undefined;
          if (type === "number") {
            onNewValue({ name, value: newValue as number });
          } else {
            onNewValue({ name, value: newValue as string });
          }
        }}
      />
      {inputComponent}
    </div>
  );
}
