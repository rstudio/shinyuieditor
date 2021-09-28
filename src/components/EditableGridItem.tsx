/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useRecoilValue } from "recoil";
import { GridItemAtom, useToggleSelectedItem } from "../state-logic/gridItems";
import { GridItemDiv } from "./GridItemDiv";

export default function EditableGridItem({
  name,
  itemDefState,
}: {
  name: string;
  itemDefState: GridItemAtom;
}) {
  const toggleSelectedItem = useToggleSelectedItem();
  const itemDef = useRecoilValue(itemDefState);

  return (
    <GridItemDiv
      css={{
        backgroundColor: "var(--color, rgba(34, 139, 34, 0.835))",
        borderRadius: "var(--corner-radius)",
      }}
      {...itemDef}
      onClick={() => {
        toggleSelectedItem(name);
      }}
      title={name}
    />
  );
}
