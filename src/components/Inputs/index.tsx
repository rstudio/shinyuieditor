/**
 * Common props for input widgets to make sure they can properly speak to the
 * onChange callbacks etc..
 */
export type InputWidgetCommonProps<T> = {
  name: string;
  label?: string;
  noLabel?: boolean;
  optional?: boolean;
  value?: T;
  onChange?: (x: { name: string; value?: T }) => void;
  defaultValue?: T;
};
