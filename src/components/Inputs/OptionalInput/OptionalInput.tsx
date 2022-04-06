import Checkbox from "../Checkbox";
import NumericInput from "../NumericInput";

import classes from "./styles.module.css";

export default function OptionalInput({
  name,
  value,
  defaultValue,
  onChange,
}: {
  name: string;
  value: number | undefined;
  defaultValue: number;
  onChange: (x: { name: string; value: number | undefined }) => void;
}) {
  const isDisabled = value === undefined;
  return (
    <div className={classes.container}>
      <Checkbox
        isChecked={!isDisabled}
        title={`Set ${name} value?`}
        onChange={(isTrue) => {
          onChange({ name, value: isTrue ? defaultValue : undefined });
        }}
      />
      <NumericInput
        label={name}
        value={value}
        disabled={isDisabled}
        onChange={(value) => onChange({ name, value })}
      />
    </div>
  );
}
