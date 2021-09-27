/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  GridItemAtom,
  setSelectedItemNameState,
} from "../state-logic/gridItems";
import { GridItemDiv } from "./GridItemDiv";

export default function EditableGridItem({
  name,
  itemDefState,
}: {
  name: string;
  itemDefState: GridItemAtom;
}) {
  const setSelectedItem = useSetRecoilState(setSelectedItemNameState);
  const itemDef = useRecoilValue(itemDefState);

  return (
    <GridItemDiv
      css={{
        backgroundColor: "var(--color, rgba(34, 139, 34, 0.835))",
        borderRadius: "var(--corner-radius)",
      }}
      {...itemDef}
      onClick={() => {
        console.log(`Clicked item ${name}`);
        setSelectedItem(name);
      }}
      title={name}
    />
  );
}
