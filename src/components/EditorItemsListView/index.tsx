import { FunctionalComponent } from "preact";
import { memo, useCallback } from "preact/compat";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { gridItemsState } from "../../state-logic/layout-updating-logic";
import { GridItemDef } from "../../types";
import { GridCard } from "../GridCard";
import { SvgIcon } from "../Icons";
import classes from "./style.module.css";

// Not totally sure why this memo works because items is an array that should
// get replaced each state update.

let EditorItemsListView: FunctionalComponent = () => {
  const [items, setItems] = useRecoilState(gridItemsState);
  return (
    <GridCard title="Items" icon={"items"} gridArea="items">
      {items.map(({ name }) => (
        <ItemListItem key={name} name={name} setItems={setItems} />
      ))}
    </GridCard>
  );
};
EditorItemsListView.displayName = "EditorItemsListView";
EditorItemsListView = memo(EditorItemsListView);

const ItemListItem = memo(
  ({
    name,
    setItems,
  }: {
    name: string;
    setItems: SetterOrUpdater<GridItemDef[]>;
  }) => {
    const deleteItem = useCallback(() => {
      setItems((prevItems) => prevItems.filter((item) => item.name !== name));
    }, [name]);
    return (
      <div className={classes.item + " " + classes.isDeletabl}>
        <span style={{ justifySelf: "start" }}>{name}</span>
        <button onClick={() => deleteItem()} title={`Delete ${name} item`}>
          <SvgIcon name={"trashcan"} />
        </button>
      </div>
    );
  }
);

export { EditorItemsListView };
