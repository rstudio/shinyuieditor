import type { InputComponentProps } from "../inputFieldTypes";
import { makeLabelId } from "../inputFieldTypes";

export function NumberInput({
  id,
  label,
  value,
  onChange,
}: InputComponentProps<number>) {
  return (
    <input
      id={id}
      aria-label={label}
      aria-labelledby={makeLabelId(id)}
      type="number"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
      }}
    />
  );
}
