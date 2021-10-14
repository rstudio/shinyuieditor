/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import { useRecoilValue } from "recoil";
import {
  gridItemAtoms,
  gridItemNames,
  useToggleSelectedItem,
} from "state-logic/gridItems";
import { GridItemDiv } from "components/GridItemDiv";

function EditableGridItem({
  name,
  onClick,
}: {
  name: string;
  onClick: (name: string) => void;
}) {
  const itemDef = useRecoilValue(gridItemAtoms(name));

  return (
    <GridItemDiv
      css={itemStyles}
      {...itemDef}
      onClick={() => onClick(name)}
      title={name}
      aria-label={`${name}-item`}
    />
  );
}

const itemStyles = css({
  backgroundColor: "var(--color, rgba(34, 139, 34, 0.835))",
  borderRadius: "var(--corner-radius)",
});

export default function ItemsGridView() {
  const itemNames = useRecoilValue(gridItemNames);
  const toggleSelectedItem = useToggleSelectedItem();

  return (
    <>
      {itemNames.map((name) => (
        <EditableGridItem key={name} name={name} onClick={toggleSelectedItem} />
      ))}
    </>
  );
}
