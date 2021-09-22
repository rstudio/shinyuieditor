/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { makeTractPos } from "../grid-helpers";
import { GridItemDef } from "../GridTypes";
import {
  GridItemAtom,
  setSelectedItemNameState,
} from "../state-logic/gridItems";

const ItemDiv = styled.div(
  ({ startRow, endRow, startCol, endCol }: GridItemDef) => ({
    gridColumn: makeTractPos(startCol, endCol),
    gridRow: makeTractPos(startRow, endRow),
    backgroundColor: "var(--color, rgba(34, 139, 34, 0.835))",
    borderRadius: "var(--corner-radius)",
  })
);

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
    <ItemDiv {...itemDef} onClick={() => setSelectedItem(name)} title={name} />
  );
}
