import React from "react";

import { FaPlus } from "react-icons/fa";
import { MdDragHandle } from "react-icons/md";
import { ReactSortable } from "react-sortablejs";
import type { InputComponentByType } from "ui-node-definitions/src/inputFieldTypes";
import { makeLabelId } from "ui-node-definitions/src/inputFieldTypes";
import { sameObject } from "util-functions/src/equalityCheckers";

import { Trash } from "../../Icons";
import Button from "../Button/Button";

import classes from "./styles.module.css";

type ItemType = {
  id: number;
  key: string;
  value: string;
};

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
  const { state, setState, addItem, deleteItem } = useListState({
    value,
    onChange,
    newItemValue,
  });

  return (
    <div
      className={classes.list}
      aria-labelledby={makeLabelId(id)}
      aria-label={label}
    >
      <div
        className={classes.item + " " + classes.header}
        aria-label="Columns field labels"
      >
        <span className={classes.keyField}>Key</span>
        <span className={classes.valueField}>Value</span>
      </div>
      <ReactSortable
        list={state}
        setList={setState}
        handle={`.${classes.dragHandle}`}
      >
        {state.map((item, i) => (
          <div
            className={classes.item}
            data-info-dump={item.key + "-" + item.value + "-" + i}
            key={item.key + "-" + item.value + "-" + i}
          >
            <div className={classes.dragHandle} title="Reorder list">
              <MdDragHandle />
            </div>
            <input
              title="Key Field"
              className={classes.keyField}
              type="text"
              value={item.key}
              onChange={(e) => {
                const newList = [...state];
                newList[i] = { ...item, key: e.target.value };
                setState(newList);
              }}
            />
            <span className={classes.separator}>:</span>
            <input
              title="Value Field"
              className={classes.valueField}
              type="text"
              value={item.value}
              onChange={(e) => {
                const newList = [...state];
                newList[i] = { ...item, value: e.target.value };
                setState(newList);
              }}
            />
            <Button
              className={classes.deleteButton}
              onClick={() => deleteItem(item.id)}
              variant={["icon", "transparent"]}
              title={`Delete ${item.value}`}
            >
              <Trash />
            </Button>
          </div>
        ))}
      </ReactSortable>
      <Button
        className={classes.addItemButton}
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

function namedListToItemTypeArray(list: NamedList): ItemType[] {
  return Object.keys(list).map((key, i) => ({ id: i, key, value: list[key] }));
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
  const [state, setState] = React.useState<ItemType[]>([]);

  const numItems = state.length;

  // The purpose of this useEffect is to handle updating the state to reflect
  // new values sent in via the value prop. This is to keep the state in sync
  // with the value prop so we don't have stale arguments. There is probably
  // a cleaner way to do this but I'm not sure what it is.
  React.useEffect(() => {
    const valuesFromState = simplifyToChoices(state);

    if (sameObject(valuesFromState, value)) {
      // Same array detected. No changes should be made
      return;
    }

    setState(namedListToItemTypeArray(value));
  }, [state, value]);

  const deleteItem = React.useCallback((itemId: number) => {
    setState((list) => list.filter(({ id }) => id !== itemId));
  }, []);

  // Adding an item resets all the ids so we dont get crazy ids if the list has
  // been edited a lot
  const addItem = React.useCallback(() => {
    const newItem =
      typeof newItemValue === "function"
        ? newItemValue(numItems + 1)
        : newItemValue;
    setState((list) =>
      [...list, { id: -1, ...newItem }].map((item, i) => ({
        ...item,
        id: i,
      }))
    );
  }, [newItemValue, numItems]);

  return {
    state,
    setState,
    deleteItem,
    addItem,
  };
}

function simplifyToChoices(arrayVersion: ItemType[]): NamedList {
  const toReturn: NamedList = arrayVersion.reduce(
    (namedList, { key, value }) => {
      namedList[key] = value;
      return namedList;
    },
    {} as NamedList
  );
  return toReturn;
}
