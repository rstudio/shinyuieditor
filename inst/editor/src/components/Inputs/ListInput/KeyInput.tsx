import React from "react";

import { mergeClasses } from "../../../utils/mergeClasses";

import type { useListState } from "./useListState";

/**
 * Props for the KeyInput component.
 */
type KeyInputProps = {
  /** The index of the element in the list. */
  index: number;
  /** The current value of the key. */
  keyValue: string;
  /** Function to call when the key value is updated. */
  onUpdate: (newKey: string) => void;
  /** The list of all elements in the list. Used to check for duplicate keys */
  allElements: ReturnType<typeof useListState>["flatList"];
};

/**
 * Custom input for the key field of a list item. This input will show a warning
 * if the key is empty or if it is the same as another key in the list
 * @param props KeyInputProps object
 * @returns
 */
export function KeyInput(props: KeyInputProps) {
  const { displayedValue, isInvalid, onNewValue, isSameAsOtherKey } =
    useKeyInput(props);

  return (
    <span
      className={mergeClasses(
        "block relative",
        isSameAsOtherKey &&
          `after:absolute after:content-["Duplicate_key"] after:block after:text-rstudio-white after:rounded after:min-w-fit after:p-1 after:border after:z-20 after:bg-danger/90`
      )}
    >
      <input
        title="Key Field"
        className={mergeClasses(
          "min-w-0 w-full placeholder:text-rstudio-white placeholder:text-xs",
          isInvalid && "bg-danger/30 transition-colors duration-500 delay-300"
        )}
        aria-invalid={isInvalid}
        aria-label="List item key"
        type="text"
        value={displayedValue}
        placeholder={isSameAsOtherKey ? "Duplicate" : "Required"}
        onChange={(e) => {
          e.stopPropagation();
          onNewValue(e.target.value);
        }}
      />
    </span>
  );
}

/**
 * Custom input for the key field of a list item. This input will show a warning
 * if the key is empty or if it is the same as another key in the list
 * @param params KeyInputProps object
 * @returns An object with the current value of the input, whether or not it is
 * invalid, and a function to update the value
 * @see useListState
 */
function useKeyInput({
  keyValue,
  onUpdate,
  allElements,
  index,
}: KeyInputProps) {
  // Displayed value can sometimes be differnt from the actual value if the user
  // enters an invalid value. We want to show that value to the user, but not
  // update the actual value until they enter a valid value
  const [displayedValue, setDisplayedValue] = React.useState(keyValue);

  // Make sure whenever the passed in "true" value updates, then we update the
  // displayed value to match it
  // Done this way thanks to these docs https://react.dev/learn/you-might-not-need-an-effect
  const [prevValue, setPrevValue] = React.useState(keyValue);

  if (prevValue !== keyValue) {
    setPrevValue(keyValue);
    setDisplayedValue(keyValue);
  }

  const otherKeys = allElements.filter((_, i) => i !== index).map((e) => e.key);

  const isEmpty = displayedValue === "";

  const isSameAsOtherKey = otherKeys.includes(displayedValue);

  const isInvalid = isEmpty || isSameAsOtherKey;

  function onNewValue(newValue: string) {
    setDisplayedValue(newValue);

    const validNewValue = !(
      newValue === "" ||
      otherKeys.some((key) => key.toLowerCase() === newValue.toLowerCase())
    );

    if (validNewValue) {
      onUpdate(newValue);
    }
  }

  return {
    displayedValue,
    isInvalid,
    isSameAsOtherKey,
    onNewValue,
  };
}
