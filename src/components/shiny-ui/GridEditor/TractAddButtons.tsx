import { IconButton } from "@chakra-ui/button";
import React from "react";
import { FaPlus as PlusIcon } from "react-icons/fa";
import { seqArray } from "utils/array-helpers";
import { addTract, NewTract } from "utils/gridTemplates/addTract";
import { ParsedGridTemplate } from "utils/gridTemplates/parseGridTemplateAreas";

export function TractAddButtons({
  numCols,
  numRows,
  onAdd,
}: Pick<ParsedGridTemplate, "numCols" | "numRows"> & {
  onAdd: (tract: Parameters<typeof addTract>[1]) => void;
}) {
  const rowAddButtons = seqArray(numRows).map((i) => {
    const rowIndex = i + 1;
    return (
      <TractAddButton
        key={rowIndex}
        dir="rows"
        afterIndex={rowIndex}
        size="30px"
        onClick={onAdd}
      />
    );
  });

  const colAddButtons = seqArray(numCols).map((i) => {
    const colIndex = i + 1;
    return (
      <TractAddButton
        key={colIndex}
        dir="cols"
        afterIndex={colIndex}
        size="30px"
        onClick={onAdd}
      />
    );
  });

  return (
    <>
      {rowAddButtons}
      {colAddButtons}
    </>
  );
}
function TractAddButton({
  onClick,
  ...tract
}: Parameters<typeof addTract>[1] & { onClick: (t: NewTract) => void }) {
  const buttonSize = "30px";
  const pad = "3px";
  const offset = `calc(-${buttonSize} - ${pad})`;
  const { dir, afterIndex, size = "50px" } = tract;

  const placement: React.CSSProperties =
    dir === "rows"
      ? {
          gridRow: afterIndex,
          gridColumn: 1,
          alignSelf: "end",
          marginLeft: offset,
          marginBottom: offset,
        }
      : {
          gridColumn: afterIndex,
          gridRow: 1,
          justifySelf: "end",
          marginRight: offset,
          marginTop: offset,
        };

  return (
    <IconButton
      variant="ghost"
      aria-label="Add tract"
      css={{ width: buttonSize, height: buttonSize }}
      style={placement}
      onClick={() => onClick({ dir, afterIndex, size })}
      icon={<PlusIcon />}
    />
  );
}
