import type { InputComponentProps } from "../ArgumentInfo";
import { makeLabelId } from "../ArgumentInfo";

export function NumberInput({
  id,
  value,
  onChange,
}: InputComponentProps<number>) {
  return (
    <input
      id={id}
      aria-labelledby={makeLabelId(id)}
      type="number"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
      }}
    />
  );
}
