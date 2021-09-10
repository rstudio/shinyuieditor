import { useRecoilState, useRecoilValue } from "recoil";
import {
  GridItemNamesAtom,
  selectedItemNameState,
} from "../../state-logic/gridItems";
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
  const [selectedItemName, setSelectedItemName] = useRecoilState(
    selectedItemNameState
  );

  const toggleSelected = (name: string) => {
    setSelectedItemName((previousSelection) =>
      previousSelection === name ? null : name
    );
  };
  const itemNames = useRecoilValue(itemNamesAtom);
  return (
    <GridCard title="Items" icon="items" gridArea="items">
      {itemNames.map((name) => (
        <div
          key={name}
          className={
            classes.item +
            (name === selectedItemName ? " " + classes.selected : "")
          }
          onClick={() => toggleSelected(name)}
        >
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
