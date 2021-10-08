import { List, ListIcon, ListItem } from "@chakra-ui/layout";
import { GridPos } from "GridTypes";
import { ImStack } from "react-icons/im";
import { useRecoilTransaction_UNSTABLE } from "recoil";
import { modalStateAtom } from "views/InfoModal";
import { gridItemAtoms, gridItemNames } from "./gridItems";
import { TractDirection } from "./gridLayout/atoms";

export default function useRemoveTract() {
  const removeTract = useRecoilTransaction_UNSTABLE(
    ({ get, set }) => (dir: TractDirection, index: number) => {
      // First check for trouble elements before proceeding so we can error out
      // and tell the user why

      // The grid positions are indexed by 1 instead of 0 so we need to add
      // one to compare with the grid position
      const oneBasedIndex = index + 1;
      const itemNames = get(gridItemNames);
      const troubleElementsNames: string[] = itemNames.filter((name) => {
        const el = get(gridItemAtoms(name));
        const startPos: keyof GridPos =
          dir === "rows" ? "startRow" : "startCol";
        const endPos: keyof GridPos = dir === "rows" ? "endRow" : "endCol";
        return el[startPos] === el[endPos] && el[startPos] === oneBasedIndex;
      });

      if (troubleElementsNames.length > 0) {
        set(modalStateAtom, {
          title: `Can't remove ${dir === "rows" ? "row" : "column"}!`,
          content: (
            <InTheWayItemsWarning names={troubleElementsNames} dir={dir} />
          ),
        });
        return;
      }

      itemNames.forEach((name) => {
        set(gridItemAtoms(name), (el) => {
          const startPos: keyof GridPos =
            dir === "rows" ? "startRow" : "startCol";
          const endPos: keyof GridPos = dir === "rows" ? "endRow" : "endCol";
          const newEl = { ...el };
          if (newEl[startPos] > oneBasedIndex) {
            newEl[startPos]--;
          }

          const endVal = newEl[endPos] ?? newEl[startPos];
          if (endVal >= oneBasedIndex) {
            newEl[endPos] = endVal - 1;
          }

          // THIS IS NOT WORKING. GET WORKING

          return newEl;
        });
      });

      // this.elements.forEach((el) => {
      //   const { startId, endId } = makeStartEndForDir(dir);
      //   const elPosition = el.position;

      //   if (elPosition[startId] > index) {
      //     elPosition[startId]--;
      //   }
      //   if (elPosition[endId] >= index) {
      //     elPosition[endId]--;
      //   }
      //   el.position = elPosition;
      // });

      // const tractSizes = this.gridLayout[dir];
      // tractSizes.splice(index - 1, 1);
      debugger;
    }
  );
  return removeTract;
}

function InTheWayItemsWarning({
  names,
  dir,
}: {
  names: string[];
  dir: TractDirection;
}) {
  const dirSingular = dir === "rows" ? "row" : "column";
  return (
    <>
      <p>
        The following items are entirely contained within the {dirSingular} and
        would be removed.
      </p>
      <List spacing={3}>
        {names.map((name) => (
          <ListItem key={name}>
            <ListIcon as={ImStack} color="green.500" />
            {name}
          </ListItem>
        ))}
      </List>
      <p>To remove this {dirSingular}, either move or remove these elements.</p>
    </>
  );
}
