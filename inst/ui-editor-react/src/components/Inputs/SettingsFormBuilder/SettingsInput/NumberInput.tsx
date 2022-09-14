import type { InputComponentProps } from "../ArgumentInfo";

export function NumberInput({
  id,
  value,
  onChange,
}: InputComponentProps<number>) {
  return (
    <input
      id={id}
      type="number"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
      }}
    />
  );
}
