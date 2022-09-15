import React from "react";

import { Trash } from "components/Icons";
import { FaPlus } from "react-icons/fa";
import { MdDragHandle } from "react-icons/md";
import { ReactSortable } from "react-sortablejs";
import { sameObject } from "utils/equalityCheckers";

import Button from "../Button/Button";
import type { InputComponentProps } from "../SettingsFormBuilder/ArgumentInfo";
import { makeLabelId } from "../SettingsFormBuilder/ArgumentInfo";

import type { ItemType, NamedList } from "./NamedListInput";
import { simplifyToChoices } from "./NamedListInput";
import classes from "./styles.module.css";

type NewItemValue = { key: string; value: string };

export function NamedListInputSimple({
  id,
  value,
  onChange,
  newItemValue = { key: "myKey", value: "myValue" },
}: InputComponentProps<
  NamedList,
  {
    newItemValue?: NewItemValue;
  }
>) {
  const { state, setState, addItem, deleteItem } = useListState({
    value,
    onChange,
    newItemValue,
  });

  return (
    <div
      className={classes.list}
      aria-labelledby={makeLabelId(id)}
      aria-label="Reorderable list input"
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
          <div className={classes.item} key={item.id}>
            <div className={classes.dragHandle} title="Reorder list">
              <MdDragHandle />
            </div>
            <input
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

function useListState({
  value,
  onChange,
  newItemValue,
}: {
  value: NamedList;
  onChange: (x: NamedList) => void;
  newItemValue: NewItemValue;
}) {
  const [state, setState] = React.useState<ItemType[]>(
    value !== undefined
      ? Object.keys(value).map((key, i) => ({ id: i, key, value: value[key] }))
      : []
  );

  React.useEffect(() => {
    const newList = simplifyToChoices(state);

    if (sameObject(newList, value ?? {})) {
      // Same array detected. No changes should be made
      return;
    }

    onChange(newList);
  }, [onChange, state, value]);

  const deleteItem = React.useCallback((itemId: number) => {
    setState((list) => list.filter(({ id }) => id !== itemId));
  }, []);

  // Adding an item resets all the ids so we dont get crazy ids if the list has
  // been edited a lot
  const addItem = React.useCallback(() => {
    setState((list) =>
      [...list, { id: -1, ...newItemValue }].map((item, i) => ({
        ...item,
        id: i,
      }))
    );
  }, [newItemValue]);

  return {
    state,
    setState,
    deleteItem,
    addItem,
  };
}
