import React from "react";

import { FaPlus } from "react-icons/fa";
import { MdDragHandle } from "react-icons/md";
import { ReactSortable } from "react-sortablejs";
import type { InputComponentByType } from "ui-node-definitions/src/inputFieldTypes";
import { makeLabelId } from "ui-node-definitions/src/inputFieldTypes";
import { sameObject } from "util-functions/src/equalityCheckers";

import { mergeClasses } from "../../../utils/mergeClasses";
import { Trash } from "../../Icons";
import Button from "../Button/Button";

type ItemArray = {
  id: number;
  key: string;
  value: string;
}[];

export type NamedList = Record<string, string>;

export function isNamedList(x: any): x is NamedList {
  if (typeof x !== "object") return false;

  const hasNonStringEntries = Object.values(x).find(
    (el) => typeof el !== "string"
  );
  if (hasNonStringEntries) return false;

  return true;
}

type NewItemValue = Required<InputComponentByType<"list">>["newItemValue"];

export function NamedListInput({
  id,
  label,
  value,
  onChange,
  newItemValue = (i) => ({ key: "Value" + i, value: "value" + i }),
}: InputComponentByType<"list">) {
  const { state, addItem, deleteItem, reorderItems, updateKey, updateValue } =
    useListState({
      value,
      onChange,
      newItemValue,
    });

  return (
    <div
      className="w-fit flex flex-col items-center my-2"
      aria-labelledby={makeLabelId(id)}
      aria-label={label}
    >
      <ListItem className="text-center -my-1" aria-label="Columns field labels">
        <span className="col-start-2">Key</span>
        <span className="col-start-4">Value</span>
      </ListItem>
      <ReactSortable
        list={state}
        setList={reorderItems}
        handle=".NamedListDragHandle"
      >
        {state.map((item, i) => (
          <ListItem className="my-1" aria-label="List item" key={i}>
            <div
              className="NamedListDragHandle grid place-items-center cursor-ns-resize"
              title="Reorder list"
            >
              <MdDragHandle />
            </div>
            <input
              title="Key Field"
              className="min-w-0"
              aria-label="List item key"
              type="text"
              value={item.key}
              onChange={(e) => {
                updateKey({ index: i, newKey: e.target.value });
              }}
            />
            <span className="mb-[1px]">:</span>
            <input
              title="Value Field"
              className="min-w-0"
              type="text"
              aria-label="List item value"
              value={item.value}
              onChange={(e) => {
                updateValue({ index: i, newValue: e.target.value });
              }}
            />
            <Button
              className="grid place-content-center p-0 area[delete] hover:scale-110 mb-[2px]"
              onClick={() => deleteItem(item.id)}
              variant={["icon", "transparent"]}
              title={`Delete ${item.value}`}
            >
              <Trash />
            </Button>
          </ListItem>
        ))}
      </ReactSortable>
      <Button
        className="text-icon -mt-1 p-1"
        onClick={() => addItem()}
        variant={["icon", "transparent"]}
        title="Add new item"
        aria-label="Add new item to list"
      >
        <FaPlus />
      </Button>
    </div>
  );
}

function useListState({
  value,
  onChange,
  newItemValue,
}: {
  value: NamedList;
  onChange: (x: NamedList) => void;
  newItemValue: NewItemValue;
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

      // Now convert the state array back into a NamedList and update
      // the value
      onChange(itemTypeArrayToNamedList(newState));
    },
    [onChange, state]
  );

  return {
    state,
    setState,
    reorderItems,
    deleteItem,
    addItem,
    updateKey,
    updateValue,
  };
}

function namedListToItemTypeArray(list: NamedList): ItemArray {
  return Object.keys(list).map((key, i) => ({ id: i, key, value: list[key] }));
}

function itemTypeArrayToNamedList(array: ItemArray): NamedList {
  return array.reduce((list, { key, value }) => {
    list[key] = value;
    return list;
  }, {} as NamedList);
}

// Custom div that takes all the same props as a <div> component
function ListItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={mergeClasses(
        className,
        "w-100 grid grid-cols-[15px_1fr_auto_1fr_15px]",
        "gap-1 p-1 items-center rounded [&.sortable-chosen]:outline",
        "[&.sortable-chosen]:outline-offset-[-2px] [&.sortable-chosen]:outline-rstudio-grey/30 [&.sortable-chosen]:shadow-lg"
      )}
      {...props}
    />
  );
}
