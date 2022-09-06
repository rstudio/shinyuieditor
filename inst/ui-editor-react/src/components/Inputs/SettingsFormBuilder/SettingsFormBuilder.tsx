// Extract out only the keys that map to properties of type T
import "./styles.scss";

type KnownArgTypes = string | number;
type UiNodeSettingsObj = Record<string, KnownArgTypes>;

type SettingsInfo<Obj extends UiNodeSettingsObj> = {
  [K in keyof Obj]: { default: Obj[K]; label: string };
};

type OnChangeCallback<Obj extends UiNodeSettingsObj> = (values: Obj) => void;

type InputComponentsMap<Settings extends UiNodeSettingsObj> = Record<
  keyof Settings,
  JSX.Element
>;

type InputComponentsMap2<Settings extends UiNodeSettingsObj> = {
  [K in keyof Settings]: JSX.Element;
};

type SettingsFormBuilderProps<Settings extends UiNodeSettingsObj> = {
  settings: Settings;
  settingsInfo: SettingsInfo<Settings>;
  onChange: OnChangeCallback<Settings>;
  renderInputs?: (inputsComps: InputComponentsMap<Settings>) => JSX.Element;
};

function keysOf<T extends Object>(obj: T): Array<keyof T> {
  return Array.from(Object.keys(obj)) as any;
}
export function SettingsFormBuilder<Settings extends UiNodeSettingsObj>({
  settings,
  settingsInfo,
  onChange,
  renderInputs,
}: SettingsFormBuilderProps<Settings>) {
  const NameInputComp = keysOf(settings).map((name) => {
    if (typeof name !== "string")
      throw new Error("How did that non-string key get in here?");

    const value = settings[name];
    return [
      name,
      <SettingsInput
        key={name}
        name={name}
        label={settingsInfo[name].label}
        value={value}
        onChange={(updatedValue) =>
          onChange({
            ...settings,
            [name]: updatedValue,
          })
        }
      />,
    ];
  });

  const Inputs = Object.fromEntries(
    NameInputComp
  ) as InputComponentsMap2<Settings>;

  return (
    <form className="SettingsFormBuilder">
      {renderInputs ? renderInputs(Inputs) : Object.values(Inputs)}
    </form>
  );
}

function SettingsInput<T extends KnownArgTypes>({
  label,
  value,
  name,
  onChange,
}: {
  label: string;
  value: T;
  name: string;
  onChange: (newVal: T) => void;
}) {
  return (
    <label className="SettingsInput" key={name}>
      {label}
      <SettingsInput2 value={value} onChange={onChange} />
    </label>
  );
}

type UpdateCallback<T> = (newVal: T) => void;
type SettingsInputProps<T> = {
  value: T;
  onChange: UpdateCallback<T>;
};
function SettingsInput2<T extends KnownArgTypes>({
  value,
  onChange,
}: SettingsInputProps<T>) {
  if (typeof value === "string") {
    return (
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value;
          (onChange as UpdateCallback<string>)(newValue);
        }}
      />
    );
  }

  if (typeof value === "number") {
    return (
      <input
        type="number"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          (onChange as UpdateCallback<number>)(Number(e.target.value));
        }}
      />
    );
  }

  throw new Error("Dont know how to handle this input type yet");
}
