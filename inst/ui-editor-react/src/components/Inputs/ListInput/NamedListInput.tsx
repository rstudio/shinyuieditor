import React from "react";

import CategoryDivider from "components/CategoryDivider";
import { Trash } from "components/Icons";
import { FaPlus } from "react-icons/fa";
import { MdDragHandle } from "react-icons/md";
import { ReactSortable } from "react-sortablejs";
import { sameObject } from "utils/equalityCheckers";

import type { InputWidgetCommonPropsOld } from "..";
import Button from "../Button/Button";
import type { OnChangeCallback } from "../SettingsUpdateContext";
import { useOnChange } from "../SettingsUpdateContext";

import classes from "./styles.module.css";

type ItemType = {
  id: number;
  key: string;
  value: string;
};

export type NamedList = Record<string, string>;

export default function NamedListInput({
  name,
  label,
  value,
  onChange,
  optional = false,
  newItemValue = { key: "myKey", value: "myValue" },
}: InputWidgetCommonPropsOld<NamedList> & {
  newItemValue?: { key: string; value: string };
}) {
  const [state, setState] = React.useState<ItemType[]>(
    value !== undefined
      ? Object.keys(value).map((key, i) => ({ id: i, key, value: value[key] }))
      : []
  );

  const onNewValue = useOnChange(onChange as OnChangeCallback);

  React.useEffect(() => {
    const newList = simplifyToChoices(state);

    if (sameObject(newList, value ?? {})) {
      // Same array detected. No changes should be made
      return;
    }

    onNewValue({ name, value: newList });
  }, [name, onNewValue, state, value]);

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

  return (
    <div className={classes.container}>
      <CategoryDivider category={name ?? label} />
      <div className={classes.list}>
        <div className={classes.item + " " + classes.header}>
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
        >
          <FaPlus />
        </Button>
      </div>
    </div>
  );
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
