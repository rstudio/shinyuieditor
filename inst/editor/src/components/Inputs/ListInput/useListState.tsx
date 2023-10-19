import React from "react";

import { sameObject } from "util-functions/src/equalityCheckers";

import type {
  InputComponentByType,
  NamedList,
} from "../../../ui-node-definitions/inputFieldTypes";

export type ItemArray = {
  id: number;
  key: string;
  value: string;
}[];

type NewItemValue = Required<InputComponentByType<"list">>["newItemValue"];

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
  valueOnlyMode: boolean
): NamedList {
  if (valueOnlyMode) {
    return array.map((item) => item.value);
  }

  return array.reduce((list, { key, value }) => {
    list[key] = value;
    return list;
  }, {} as Record<string, string>);
}

/**
 * Convert a NamedList to an array of items for iterating over.
 * @param list NamedList to convert. Could be a key-value object or an array of strings
 * @returns An array of items with an id, key, and value
 */
export function namedListToItemTypeArray(list: NamedList): ItemArray {
  if (Array.isArray(list)) {
    return list.map((value, i) => ({ id: i, key: value, value }));
  }

  return Object.keys(list).map((key, i) => ({
    id: i,
    key,
    value: list[key],
  }));
}

export function useListState({
  value,
  onChange,
  newItemValue,
}: {
  value: NamedList;
  onChange: (x: NamedList) => void;
  newItemValue: NewItemValue;
}) {
  // value-only to avoid so many negative conditions
  const [valueOnlyMode, setValueOnlyMode] = React.useState<boolean>(false);
  const [keyValueMismatches, setKeyValueMismatches] =
    React.useState<ItemArray | null>(null);

  const [state, setState] = React.useState<ItemArray>([]);

  const numItems = state.length;

  // The purpose of this useEffect is to handle updating the state to reflect
  // new values sent in via the value prop. This is to keep the state in sync
  // with the value prop so we don't have stale arguments. There is probably
  // a cleaner way to do this but I'm not sure what it is.
  React.useEffect(() => {
    const valuesFromState = itemTypeArrayToNamedList(state, valueOnlyMode);

    if (sameObject(valuesFromState, value)) {
      // Same array detected. No changes should be made
      return;
    }

    setState(namedListToItemTypeArray(value));
  }, [state, value, valueOnlyMode]);

  React.useEffect(() => {
    if (!valueOnlyMode) {
      return;
    }

    const mismatches = getKeyValueMismatches(state);

    if (mismatches === null) {
      return;
    }

    setKeyValueMismatches(mismatches);
  }, [state, valueOnlyMode]);

  const deleteItem = React.useCallback(
    (itemId: number) => {
      const newValue = { ...value };

      if (Array.isArray(newValue)) {
        newValue.splice(itemId, 1);
      } else {
        delete newValue[state[itemId].key];
      }

      onChange(newValue);
    },
    [onChange, state, value]
  );

  // Adding an item resets all the ids so we dont get crazy ids if the list has
  // been edited a lot
  const addItem = React.useCallback(() => {
    const newItem =
      typeof newItemValue === "function"
        ? newItemValue(numItems + 1)
        : newItemValue;

    onChange({ ...value, [newItem.key]: newItem.value });
  }, [newItemValue, numItems, onChange, value]);

  const reorderItems = React.useCallback(
    (newItemsOrder: ItemArray) => {
      // The first time this is called it's an empty array so we can ignore that
      if (newItemsOrder.length === 0) return;

      onChange(itemTypeArrayToNamedList(newItemsOrder, valueOnlyMode));
    },
    [onChange, valueOnlyMode]
  );

  const updateKey = React.useCallback(
    ({ index: i, newKey }: { index: number; newKey: string }) => {
      // Copy the state array so we can modify it
      const newState = [...state];

      // Update the item we want to change's key
      newState[i] = { ...newState[i], key: newKey };

      // If the new key is already in the list, we need to delete the
      // old item with that key.
      // TODO: Pause here and give a validation error until the user has updated the key
      const itemWithSameKeyIndex = newState.findIndex(
        (item, j) => item.key === newKey && j !== i
      );
      if (itemWithSameKeyIndex !== -1) {
        newState.splice(itemWithSameKeyIndex, 1);
      }

      // Now convert the state array back into a NamedList and update
      // the value
      onChange(itemTypeArrayToNamedList(newState, valueOnlyMode));
    },
    [onChange, state, valueOnlyMode]
  );

  const updateValue = React.useCallback(
    ({ index: i, newValue }: { index: number; newValue: string }) => {
      // Copy the state array so we can modify it
      const newState = [...state];

      // Update the item we want to change's key
      newState[i] = { ...newState[i], value: newValue };

      // Keep key in sync with value if we're not in the keyInValue mode
      if (valueOnlyMode) {
        newState[i] = { ...newState[i], key: newValue };
      }

      // Now convert the state array back into a NamedList and update
      // the value
      onChange(itemTypeArrayToNamedList(newState, valueOnlyMode));
    },
    [valueOnlyMode, onChange, state]
  );

  // If the user has entered the simple only-value mode, we need to ensure that
  // the keys and values are the same. The key takes precedence over the value,
  // so we need to update the values to match the keys
  const mergeKeysAndValues = React.useCallback(() => {
    const newState = [...state];

    newState.forEach((item) => {
      item.value = item.key;
    });

    onChange(itemTypeArrayToNamedList(newState, true));
    setValueOnlyMode(true);
    setKeyValueMismatches(null);
  }, [onChange, state]);

  const onCancelSimplify = () => {
    setKeyValueMismatches(null);
  };

  const onValueModeToggle = (simpleMode: boolean) => {
    if (!simpleMode) {
      // We can always go to the more complicated mode
      setValueOnlyMode(false);
      return;
    }

    const keyValueMismatches = getKeyValueMismatches(state);

    if (keyValueMismatches === null) {
      // If the keys and values are the same, we can always go to the simple mode
      setValueOnlyMode(true);
      return;
    }

    // If we can't go to the simple mode, we need to show the mismatch message
    setKeyValueMismatches(keyValueMismatches);
  };

  return {
    state,
    setState,
    reorderItems,
    deleteItem,
    addItem,
    updateKey,
    updateValue,
    mergeKeysAndValues,
    valueOnlyMode,
    onValueModeToggle,
    keyValueMismatches,
    onCancelSimplify,
  };
}

function getKeyValueMismatches(x: ItemArray): ItemArray | null {
  const mismatches = x.filter(
    (item) => item.key !== item.value && item.key !== ""
  );

  if (mismatches.length === 0) {
    return null;
  }

  return mismatches;
}
