import type { InputComponentByType } from "../inputFieldTypes";
import { makeLabelId } from "../inputFieldTypes";

export function StringInput({
  id,
  label,
  value,
  onChange,
  longform,
}: InputComponentByType<"string">) {
  return (
    <input
      className="SUE-Input"
      aria-label={label}
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
