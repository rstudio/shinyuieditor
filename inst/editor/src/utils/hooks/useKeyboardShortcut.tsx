import * as React from "react";

type KeyboardShortcutOptions = {
  /** Key code to listen for. E.g. `"Backspace"` **/
  key: string;
  /** Do we need the metakey to be pressed down to count keypress? E.g. for
   * combos like command+z **/
  withMeta?: boolean;
  /** Do we need the shift to be pressed down to count keypress? E.g. for
   * combos like command+shift+z **/
  withShift?: boolean;
  /** Callback to run after the key was pressed. Argument is the `Element` in
  focus when key was pressed.**/
  onPress: (pressTarget: Element) => void;
};

/**
 * Listen for the press of a given key and call a callback.
 * @param opts Options object
 */
export function useKeyboardShortcut({
  key,
  withMeta = false,
  withShift = false,
  onPress,
}: KeyboardShortcutOptions) {
  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (!(e.target instanceof Element)) return;

      if (e.key === key && withMeta === e.metaKey && withShift === e.shiftKey) {
        onPress(e.target);
      }
    },
    [key, onPress, withMeta, withShift]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
}
