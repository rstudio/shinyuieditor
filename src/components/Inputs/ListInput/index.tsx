import React from "react";

import { FaPlus } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { MdDragHandle } from "react-icons/md";
import { ReactSortable } from "react-sortablejs";
import { sameArray } from "utils/equalityCheckers";

import type { InputWidgetCommonProps } from "..";
import Button from "../Button";
import { InputLabel } from "../InputSections";
import type { OnChangeCallback } from "../SettingsUpdateContext";
import { useOnChange } from "../SettingsUpdateContext";

import classes from "./styles.module.css";

type ItemType = {
  id: number;
  value: string;
};
export default function ListInput({
  name,
  label,
  value,
  onChange,
  optional = false,
  newItemValue = "item",
}: InputWidgetCommonProps<string[]> & { newItemValue?: string }) {
  const [state, setState] = React.useState<ItemType[]>(
    value?.map((x, i) => ({ id: i, value: x })) ?? []
  );

  const onNewValue = useOnChange(onChange as OnChangeCallback);

  React.useEffect(() => {
    const newList = simplifyToChoices(state);

    if (sameArray(newList, value ?? [])) {
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
      [...list, { id: -1, value: newItemValue }].map(({ value }, i) => ({
        id: i,
        value,
      }))
    );
  }, [newItemValue]);

  return (
    <div className={classes.container}>
      <InputLabel>{name ?? label}:</InputLabel>
      <div className={classes.list}>
        <ReactSortable list={state} setList={setState}>
          {state.map((item, i) => (
            <div className={classes.item} key={item.id}>
              <div className={classes.dragHandle} title="Reorder list">
                <MdDragHandle />
              </div>
              <input
                type="text"
                value={item.value}
                onChange={(e) => {
                  const newValue = e.target.value;
                  const newList = [...state];
                  newList[i] = { id: item.id, value: newValue };
                  setState(newList);
                }}
              />
              <Button
                className={classes.deleteButton}
                onClick={() => deleteItem(item.id)}
                variant="icon"
                title={`Delete ${item.value}`}
              >
                <FiTrash />
              </Button>
            </div>
          ))}
        </ReactSortable>
        <div>
          <Button onClick={() => addItem()} variant="icon" title="Add new item">
            <FaPlus />
          </Button>
        </div>
      </div>
    </div>
  );
}

function simplifyToChoices(withId: ItemType[]): string[] {
  return withId.map(({ value }) => value);
}
