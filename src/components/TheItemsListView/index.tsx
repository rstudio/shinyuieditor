import { GridLayoutTemplate } from "../../types";
import { GridCard } from "../GridCard";
import { ItemsIcon, TrashcanIcon } from "../Icons";
import classes from "./style.module.css";

export const TheItemsListView = ({
  items,
  deleteItem,
}: {
  items: GridLayoutTemplate["items"];
  deleteItem: (name: string) => void;
}) => (
  <GridCard title="Items" icon={<ItemsIcon />} gridArea="items">
    {items.map(({ name }) => (
      <ItemListItem name={name} onDelete={() => deleteItem(name)} />
    ))}
  </GridCard>
);

const ItemListItem = ({
  name,
  onDelete,
}: {
  name: string;
  onDelete?: () => void;
}) => {
  return (
    <div class={classes.item + (onDelete ? " " + classes.isDeletable : "")}>
      <span style={{ justifySelf: "start" }}>{name}</span>
      {onDelete ? (
        <button onClick={() => onDelete()} title={`Delete ${name} item`}>
          <TrashcanIcon />
        </button>
      ) : null}
    </div>
  );
};
