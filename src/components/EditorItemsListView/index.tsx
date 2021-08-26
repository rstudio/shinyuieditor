import { FunctionalComponent } from "preact";
import { memo } from "preact/compat";
import { useRecoilValue } from "recoil";
import { useDeleteItem } from "../../state-logic/gridItems";
import { itemNamesState } from "../../state-logic/recoilAtoms";
import { GridCard } from "../GridCard";
import { SvgIcon } from "../Icons";
import classes from "./style.module.css";

// Not totally sure why this memo works because items is an array that should
// get replaced each state update.

let EditorItemsListView: FunctionalComponent = () => {
  const itemNames = useRecoilValue(itemNamesState);

  return (
    <GridCard title="Items" icon={"items"} gridArea="items">
      {itemNames.map((name) => (
        <ItemListItem key={name} name={name} />
      ))}
    </GridCard>
  );
};
EditorItemsListView.displayName = "EditorItemsListView";
EditorItemsListView = memo(EditorItemsListView);

const ItemListItem = memo(({ name }: { name: string }) => {
  const deleteItem = useDeleteItem();

  return (
    <div className={classes.item + " " + classes.isDeletabl}>
      <span style={{ justifySelf: "start" }}>{name}</span>
      <button onClick={() => deleteItem(name)} title={`Delete ${name} item`}>
        <SvgIcon name={"trashcan"} />
      </button>
    </div>
  );
});

export { EditorItemsListView };
