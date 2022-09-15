import type { InputComponentProps } from "../ArgumentInfo";
import { makeLabelId } from "../ArgumentInfo";

export function StringInput({
  id,
  value,
  onChange,
}: InputComponentProps<string>) {
  return (
    <input
      aria-labelledby={makeLabelId(id)}
      id={id}
      type="text"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
      }}
    />
  );
}
