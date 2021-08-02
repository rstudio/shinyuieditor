import { useLayoutDispatch } from "../../state-logic/layout-updating-logic";
import { GridItemDef } from "../../types";
import { TrashcanIcon } from "../Icons";
import { GridCard } from "../GridCard";
import { ItemsIcon } from "../Icons";
import classes from "./style.module.css";

export const TheItemsListView = ({ items }: { items: GridItemDef[] }) => (
  <GridCard title="Items" icon={<ItemsIcon />} gridArea="items">
    {items.map(({ name }) => (
      <ItemListItem name={name} isDeletable />
    ))}
  </GridCard>
);

const ItemListItem = ({
  name,
  isDeletable,
}: {
  name: string;
  isDeletable?: boolean;
}) => {
  const layoutDispatch = useLayoutDispatch();

  return (
    <div class={classes.item + (isDeletable ? " " + classes.isDeletable : "")}>
      <span style={{ justifySelf: "start" }}>{name}</span>
      {isDeletable ? (
        <button
          onClick={() => {
            layoutDispatch({ type: "Delete-Item", name });
          }}
          title={`Delete ${name} item`}
        >
          <TrashcanIcon />
        </button>
      ) : null}
    </div>
  );
};
