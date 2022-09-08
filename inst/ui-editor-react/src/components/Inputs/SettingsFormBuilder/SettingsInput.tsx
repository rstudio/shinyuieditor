import type { KnownArgTypes } from "./SettingsFormBuilder";

type NewValCallback<T> = (newVal: T) => void;
type SettingsInputProps<T> = {
  value: T;
  onChange: NewValCallback<T>;
};

export function SettingsInput<T extends KnownArgTypes>({
  value,
  onChange,
}: SettingsInputProps<T>) {
  if (typeof value === "string") {
    return (
      <StringInput
        value={value}
        onChange={(newValue) => (onChange as NewValCallback<string>)(newValue)}
      />
    );
  }

  if (typeof value === "number") {
    return (
      <input
        type="number"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          (onChange as NewValCallback<number>)(Number(e.target.value));
        }}
      />
    );
  }

  throw new Error("Dont know how to handle this input type yet");
}
function StringInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (x: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
      }}
    />
  );
}
