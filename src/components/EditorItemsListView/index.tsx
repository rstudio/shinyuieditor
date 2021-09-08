import { useRecoilValue } from "recoil";
import type { GridItemNamesAtom } from "../../state-logic/gridItems/atoms";
import { GridCard } from "../GridCard";
import { SvgIcon } from "../Icons";
import classes from "./style.module.css";

export const EditorItemsListView = ({
  itemNamesAtom,
  deleteItem,
}: {
  itemNamesAtom: GridItemNamesAtom;
  deleteItem: (name: string) => void;
}) => {
  const itemNames = useRecoilValue(itemNamesAtom);
  return (
    <GridCard title="Items" icon="items" gridArea="items">
      {itemNames.map((name) => (
        <div key={name} className={classes.item}>
          {name}
          <button
            onClick={() => deleteItem(name)}
            title={`Delete ${name} item`}
          >
            <SvgIcon name="trashcan" />
          </button>
        </div>
      ))}
    </GridCard>
  );
};
