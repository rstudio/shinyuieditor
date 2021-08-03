import { GridLayoutTemplate } from "../../types";
import { GridCard } from "../GridCard";
import { SvgIcon } from "../Icons";
import classes from "./style.module.css";

export const EditorItemsListView = ({
  items,
  deleteItem,
}: {
  items: GridLayoutTemplate["items"];
  deleteItem: (name: string) => void;
}) => (
  <GridCard title="Items" icon={"items"} gridArea="items">
    {items.map(({ name }) => (
      <ItemListItem key={name} name={name} onDelete={() => deleteItem(name)} />
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
    <div className={classes.item + (onDelete ? " " + classes.isDeletable : "")}>
      <span style={{ justifySelf: "start" }}>{name}</span>
      {onDelete ? (
        <button onClick={() => onDelete()} title={`Delete ${name} item`}>
          <SvgIcon name={"trashcan"} />
        </button>
      ) : null}
    </div>
  );
};
