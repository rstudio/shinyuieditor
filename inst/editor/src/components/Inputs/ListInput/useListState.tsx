import React from "react";

import type {
  InputComponentByType,
  NamedList,
} from "../../../ui-node-definitions/inputFieldTypes";

import {
  getKeyValueMismatches,
  isValueOnlyMode,
  namedListToItemTypeArray,
  swapKeysForObject,
} from "./namedListUtils";

type ItemArray = ReturnType<typeof namedListToItemTypeArray>;
type ListMode = "key-value" | "value-only";

export function useListState({
  value,
  onChange,
  newItemValue,
}: {
  value: NamedList;
  onChange: (x: NamedList) => void;
  newItemValue: Required<InputComponentByType<"list">>["newItemValue"];
}) {
  // value-only to avoid so many negative conditions
  const [keyValueMismatches, setKeyValueMismatches] =
    React.useState<ItemArray | null>(null);

  const listMode = isValueOnlyMode(value) ? "value-only" : "key-value";

  const deleteItem = React.useCallback(
    (itemId: number) => {
      if (isValueOnlyMode(value)) {
        const newValue = [...value];

        newValue.splice(itemId, 1);

        onChange(newValue);

        return;
      }

      const newValue = { ...value };

      // Key to delete
      delete newValue[Object.keys(newValue)[itemId]];

      onChange(newValue);
    },
    [onChange, value]
  );

  // Adding an item resets all the ids so we dont get crazy ids if the list has
  // been edited a lot
  const addItem = React.useCallback(() => {
    const numItems = isValueOnlyMode(value)
      ? value.length
      : Object.keys(value).length;

    const newItem =
      typeof newItemValue === "function"
        ? newItemValue(numItems + 1)
        : newItemValue;

    if (isValueOnlyMode(value)) {
      onChange([...value, newItem.value]);
    } else {
      onChange({ ...value, [newItem.key]: newItem.value });
    }
  }, [newItemValue, onChange, value]);

  const reorderItems = React.useCallback(
    (newItemsOrder: ItemArray) => {
      // The first time this is called it's an empty array so we can ignore that
      if (newItemsOrder.length === 0) return;

      onChange(itemTypeArrayToNamedList(newItemsOrder, listMode));
    },
    [listMode, onChange]
  );

  const updateKey = React.useCallback(
    ({ index: i, newKey }: { index: number; newKey: string }) => {
      if (isValueOnlyMode(value)) {
        throw new Error("Cannot update key in value-only mode");
      }

      // Get previous key value
      const prevKey = Object.keys(value)[i];

      // Make sure previous key isn't in the list
      if (newKey !== prevKey && newKey in value) {
        throw new Error(`Key ${newKey} already exists`);
      }

      const newValue = swapKeysForObject(value, prevKey, newKey);

      // Now convert the state array back into a NamedList and update
      // the value
      onChange(newValue);
    },
    [onChange, value]
  );

  const updateValue = React.useCallback(
    ({ index: i, newValue }: { index: number; newValue: string }) => {
      if (isValueOnlyMode(value)) {
        const newValueArray = [...value];

        newValueArray[i] = newValue;

        onChange(newValueArray);

        return;
      }

      // Key-Value mode
      const newList = { ...value };

      const prevKey = Object.keys(value)[i];
      newList[prevKey] = newValue;

      onChange(newList);
    },
    [onChange, value]
  );

  const onValueModeToggle = (simpleMode: boolean) => {
    if (simpleMode) {
      // If we're going into simple mode we need to check for mismatches

      if (isValueOnlyMode(value)) {
        throw new Error("Trying to simplify a value-only list");
      }

      const keyValueMismatches = getKeyValueMismatches(value);

      if (keyValueMismatches !== null) {
        // If there are mismatches, we need to show the popup
        setKeyValueMismatches(keyValueMismatches);

        return;
      }
    }

    // Make change to data-type
    swapKeyValueMode(simpleMode ? "value-only" : "key-value");
  };

  // If the user has entered the simple only-value mode, we need to ensure that
  // the keys and values are the same. The value takes precedence over the key,
  // so we need to update the keys to match the values
  const swapKeyValueMode = React.useCallback(
    (mode: ListMode) => {
      const valueOnlyMode = isValueOnlyMode(value);

      if (mode === (valueOnlyMode ? "value-only" : "key-value")) {
        throw new Error("Trying to update to the same list mode");
      }

      const newValue = valueOnlyMode
        ? value.reduce<Record<string, string>>((obj, value) => {
            obj[value] = value;
            return obj;
          }, {})
        : Object.values(value);

      onChange(newValue);
      setKeyValueMismatches(null);
    },
    [onChange, value]
  );

  const onCancelSimplify = () => {
    setKeyValueMismatches(null);
  };

  return {
    flatList: namedListToItemTypeArray(value),
    reorderItems,
    deleteItem,
    addItem,
    updateKey,
    updateValue,
    swapKeyValueMode,
    listMode,
    onValueModeToggle,
    keyValueMismatches,
    onCancelSimplify,
  };
}

/**
 * Go from the internal state representation of an array of items to the
 * external state, which either is a key-value pair as an object or a value-only
 * array
 * @param array Internal representation
 * @param valueOnlyMode Whether or not we're in the value-only mode.
 * @returns An array of strings if in value-only mode, or an object if not
 */
function itemTypeArrayToNamedList(
  array: ItemArray,
  listMode: ListMode
): NamedList {
  if (listMode === "value-only") {
    return array.map((item) => item.value);
  }

  return array.reduce((list, { key, value }) => {
    list[key] = value;
    return list;
  }, {} as Record<string, string>);
}
