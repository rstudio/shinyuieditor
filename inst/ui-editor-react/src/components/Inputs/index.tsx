/**
 * OLD VERSION -- Common props for input widgets to make sure they can properly
 * speak to the onChange callbacks etc..
 */
export type InputWidgetCommonPropsOld<T> = {
  name: string;
  label?: string;
  noLabel?: boolean;
  optional?: boolean;
  value?: T;
  onChange?: (x: { name: string; value?: T }) => void;
  defaultValue?: T;
  disabled?: boolean;
};

/**
 * Common props for input widgets to make sure they can properly speak to the
 * onChange callbacks etc..
 */
export type InputWidgetCommonProps<Settings extends object, T> = {
  allValues: Settings;
  name: KeysOfType<Settings, string>;
  label?: string;
  noLabel?: boolean;
  optional?: boolean;
  onChange?: (x: { name: string; value?: T }) => void;
  defaultValue?: T;
  disabled?: boolean;
};

// Extract out only the keys that map to properties of type T
type KeysOfType<Obj extends object, T> = {
  [K in keyof Obj]: Obj[K] extends T | undefined ? K : never;
}[keyof Obj];
