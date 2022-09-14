import { InputComponentProps } from "../ArgumentInfo";

export function StringInput({
  id,
  value,
  onChange,
}: InputComponentProps<string>) {
  return (
    <input
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
