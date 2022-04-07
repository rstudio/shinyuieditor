import React from "react";

import { FaPlus } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { MdDragHandle } from "react-icons/md";
import { ReactSortable } from "react-sortablejs";

import type { InputWidgetCommonProps } from "..";
import Button from "../Button";

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
}: InputWidgetCommonProps<string[]> & {}) {
  const [state, setState] = React.useState<ItemType[]>(
    value?.map((x, i) => ({ id: i, value: x })) ?? []
  );

  React.useEffect(() => {
    console.log("New list value:", state);
    // onChange({ name, value: state });
  }, [state]);

  const deleteItem = React.useCallback((itemId: number) => {
    setState((list) => list.filter(({ id }) => id !== itemId));
  }, []);

  // Adding an item resets all the ids so we dont get crazy ids if the list has
  // been edited a lot
  const addItem = React.useCallback(() => {
    setState((list) =>
      [...list, { id: -1, value: "" }].map(({ value }, i) => ({ id: i, value }))
    );
  }, []);

  return (
    <div className={classes.container}>
      <h3>{name ?? label} options:</h3>
      <div className={classes.list}>
        <ReactSortable list={state} setList={setState}>
          {state.map((item, i) => (
            <div className={classes.item} key={item.id}>
              <MdDragHandle className={classes.dragHandle} />
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
              <Button onClick={() => deleteItem(item.id)} variant="icon">
                <FiTrash />
              </Button>
            </div>
          ))}
        </ReactSortable>
        <div>
          <Button onClick={() => addItem()} variant="icon">
            <FaPlus />
          </Button>
        </div>
      </div>
    </div>
  );
}
