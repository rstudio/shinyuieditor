import { memo } from "preact/compat";
import { useRecoilValue } from "recoil";
import { ItemNamesAtom } from "../../state-logic/gridItems/atoms";
import { useDeleteItem } from "../../state-logic/gridItems/hooks";
import { GridCard } from "../GridCard";
import { SvgIcon } from "../Icons";
import classes from "./style.module.css";

// Not totally sure why this memo works because items is an array that should
// get replaced each state update.

export const EditorItemsListView = ({itemNamesAtom}: {itemNamesAtom: ItemNamesAtom}) => {
  const itemNames = useRecoilValue(itemNamesAtom);
  return (
    <GridCard title="Items" icon={"items"} gridArea="items">
      {itemNames.map((name) => (
        <ItemListItem key={name} name={name} />
      ))}
    </GridCard>
  );
};

const ItemListItem = memo(({ name }: { name: string }) => {
  const deleteItem = useDeleteItem();

  return (
    <div className={classes.item + " " + classes.isDeletable}>
      <span style={{ justifySelf: "start" }}>{name}</span>
      <button onClick={() => deleteItem(name)} title={`Delete ${name} item`}>
        <SvgIcon name={"trashcan"} />
      </button>
    </div>
  );
});
