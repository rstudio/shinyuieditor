import React from "react";

import { sameObject } from "util-functions/src/equalityCheckers";

import type { InputComponentByType } from "../../../ui-node-definitions/inputFieldTypes";

import type { NamedList } from "./NamedListInput";

export type ItemArray = {
  id: number;
  key: string;
  value: string;
}[];

type NewItemValue = Required<InputComponentByType<"list">>["newItemValue"];

function itemTypeArrayToNamedList(array: ItemArray): NamedList {
  return array.reduce((list, { key, value }) => {
    list[key] = value;
    return list;
  }, {} as NamedList);
}

function namedListToItemTypeArray(list: NamedList): ItemArray {
  return Object.keys(list).map((key, i) => ({ id: i, key, value: list[key] }));
}
export function useListState({
  value,
  onChange,
  newItemValue,
  valueOnlyMode,
}: {
  value: NamedList;
  onChange: (x: NamedList) => void;
  newItemValue: NewItemValue;
  valueOnlyMode: boolean;
}) {
  const [state, setState] = React.useState<ItemArray>([]);

  const numItems = state.length;

  // The purpose of this useEffect is to handle updating the state to reflect
  // new values sent in via the value prop. This is to keep the state in sync
  // with the value prop so we don't have stale arguments. There is probably
  // a cleaner way to do this but I'm not sure what it is.
  React.useEffect(() => {
    const valuesFromState = itemTypeArrayToNamedList(state);

    if (sameObject(valuesFromState, value)) {
      // Same array detected. No changes should be made
      return;
    }

    setState(namedListToItemTypeArray(value));
  }, [state, value]);

  const deleteItem = React.useCallback(
    (itemId: number) => {
      const newValue = { ...value };
      delete newValue[state[itemId].key];

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

      const newValue = newItemsOrder.reduce((newList, item) => {
        newList[item.key] = item.value;
        return newList;
      }, {} as NamedList);

      onChange(newValue);
    },
    [onChange]
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
      onChange(itemTypeArrayToNamedList(newState));
    },
    [onChange, state]
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
      onChange(itemTypeArrayToNamedList(newState));
    },
    [valueOnlyMode, onChange, state]
  );

  // If the user has entered the simple only-value mode, we need to
  // ensure that the keys and values are the same. The value takes precedence
  // over the key, so we need to update the key to match the value
  const mergeKeysAndValues = React.useCallback(() => {
    const newState = [...state];

    newState.forEach((item) => {
      item.key = item.value;
    });

    onChange(itemTypeArrayToNamedList(newState));
  }, [onChange, state]);

  return {
    state,
    setState,
    reorderItems,
    deleteItem,
    addItem,
    updateKey,
    updateValue,
    mergeKeysAndValues,
  };
}
