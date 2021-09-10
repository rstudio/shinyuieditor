import { useRecoilValue, useSetRecoilState } from "recoil";
import { makeTractPos } from "../../helper-scripts/grid-helpers";
import {
  GridItemAtom,
  GridItemNamesAtom,
  GridItemsAtomFamily,
  setSelectedItemNameState,
} from "../../state-logic/gridItems";
import classes from "./style.module.css";

export function EditableGridItems({
  itemNamesState,
  itemDefsState,
}: {
  itemNamesState: GridItemNamesAtom;
  itemDefsState: GridItemsAtomFamily;
}) {
  const itemNames = useRecoilValue(itemNamesState);
  return (
    <>
      {itemNames.map((name) => (
        <EditableGridItem
          key={name}
          name={name}
          itemDefState={itemDefsState(name)}
        />
      ))}
    </>
  );
}

const EditableGridItem = ({
  name,
  itemDefState,
}: {
  name: string;
  itemDefState: GridItemAtom;
}) => {
  const setSelectedItem = useSetRecoilState(setSelectedItemNameState);
  const itemDef = useRecoilValue(itemDefState);
  const { startRow, endRow, startCol, endCol } = itemDef;

  return (
    <div
      className={classes.item}
      style={{
        "--cols": makeTractPos(startCol, endCol),
        "--rows": makeTractPos(startRow, endRow),
      }}
      onClick={() => setSelectedItem(name)}
      title={name}
    ></div>
  );
};
