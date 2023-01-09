import * as React from "react";

import { onMac } from "../onMac";

type KeyboardShortcutOptions = {
  /** Key code to listen for. E.g. `"Backspace"` **/
  key: string;
  /** Do we need the metakey to be pressed down to count keypress? E.g. for
   * combos like command+z **/
  withCmdCtrl: boolean;
  /** Do we need the shift to be pressed down to count keypress? E.g. for
   * combos like command+shift+z **/
  withShift: boolean;
  /** Callback to run after the key was pressed. Argument is the `Element` in
  focus when key was pressed.**/
  onPress: () => void;
};

/**
 * Listen for the press of a given key and call a callback.
 * @param opts Options object
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcutOptions[]) {
  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      // We only want keyboard shortcuts to apply when we're not focused on something
      if (!(e.target instanceof Element) || e.target.tagName !== "BODY") {
        return;
      }
      shortcuts.forEach((shortcut) => {
        if (matchesShortcutTrigger(e, shortcut)) {
          shortcut.onPress();
        }
      });
    },
    [shortcuts]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
}

function matchesShortcutTrigger(
  e: KeyboardEvent,
  shortcut: Pick<KeyboardShortcutOptions, "key" | "withCmdCtrl" | "withShift">
): boolean {
  return (
    e.key === shortcut.key &&
    shortcut.withCmdCtrl === (onMac() ? e.metaKey : e.ctrlKey) &&
    shortcut.withShift === e.shiftKey
  );
}
