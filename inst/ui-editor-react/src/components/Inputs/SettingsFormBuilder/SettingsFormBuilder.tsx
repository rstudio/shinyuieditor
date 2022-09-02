// Extract out only the keys that map to properties of type T

type KnownArgTypes = string | number;
type UiNodeSettingsObj = Record<string, KnownArgTypes>;

type SettingsInfo<Obj extends UiNodeSettingsObj> = {
  [K in keyof Obj]: { default: Obj[K]; label: string };
};

type OnChangeCallback<Obj extends UiNodeSettingsObj> = (values: Obj) => void;

type SettingsFormBuilderProps<Settings extends UiNodeSettingsObj> = {
  settings: Settings;
  settingsInfo: SettingsInfo<Settings>;
  onChange: OnChangeCallback<Settings>;
};

export function SettingsFormBuilder<Settings extends UiNodeSettingsObj>({
  settings,
  settingsInfo,
  onChange,
}: SettingsFormBuilderProps<Settings>) {
  return (
    <form>
      Building settings form for settings
      {Object.keys(settings).map((name) => {
        const value = settings[name];
        let InputComp: JSX.Element;

        if (typeof value === "string") {
          InputComp = (
            <input
              type="text"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange({
                  ...settings,
                  [name]: e.target.value,
                });
              }}
            />
          );
        } else {
          InputComp = (
            <input
              type="number"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange({
                  ...settings,
                  [name]: +e.target.value,
                });
              }}
            />
          );
        }

        return (
          <label key={name}>
            {settingsInfo[name].label}
            {InputComp}
          </label>
        );
      })}
    </form>
  );
}
