import type { KnownArgTypes } from "../constructInputComponents";

type NewValCallback<T> = (newVal: T) => void;
type SettingsInputProps<T> = {
  id: string;
  value: T;
  onChange: NewValCallback<T>;
};

export function SettingsInputElement<T extends KnownArgTypes>({
  id,
  value,
  onChange,
}: SettingsInputProps<T>) {
  if (typeof value === "string") {
    return (
      <StringInput
        id={id}
        value={value}
        onChange={(newValue) => (onChange as NewValCallback<string>)(newValue)}
      />
    );
  }

  if (typeof value === "number") {
    return (
      <input
        id={id}
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

function StringInput({ id, value, onChange }: SettingsInputProps<string>) {
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
