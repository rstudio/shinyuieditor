import Checkbox from "../Checkbox";
import NumericInput from "../NumericInput";
import { TextInput } from "../TextInput";

import classes from "./styles.module.css";

type InputSettings =
  | {
      type: "number";
      value?: number;
      defaultValue: number;
      min?: number;
      max?: number;
      onChange: (x: { name: string; value: number | undefined }) => void;
    }
  | {
      type: "string";
      value?: string;
      defaultValue: string;
      placeholder?: string;
      onChange: (x: { name: string; value: string | undefined }) => void;
    };

export default function OptionalInput({
  type,
  name,
  value,
  defaultValue,
  onChange,
}: {
  name: string;
} & InputSettings) {
  const isDisabled = value === undefined;

  const inputComponent =
    type === "number" ? (
      <NumericInput
        label={name}
        value={value}
        disabled={isDisabled}
        onChange={(value) => onChange({ name, value })}
      />
    ) : (
      <TextInput
        name={name}
        label={name}
        value={value ?? ""}
        disabled={isDisabled}
        onChange={(value) => onChange({ name, value })}
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
            onChange({ name, value: newValue as number });
          } else {
            onChange({ name, value: newValue as string });
          }
        }}
      />
      {inputComponent}
    </div>
  );
}
