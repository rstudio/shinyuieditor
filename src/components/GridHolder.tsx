/** @jsxImportSource @emotion/react */
import css from "@emotion/css";
import { CSSMeasure } from "GridTypes";
import React from "react";
import { GridTractDefs } from "state-logic/gridLayout/atoms";

interface GridHolderProps {
  rows: GridTractDefs;
  columns: GridTractDefs;
  gap: CSSMeasure;
}

export function GridHolder({
  rows,
  columns,
  gap,
  children,
}: GridHolderProps & { children: React.ReactNode }) {
  return (
    <div
      css={{
        backgroundColor: "blanchedalmond",
        display: "grid",
        gridTemplateColumns: rows.join(" "),
        gridTemplateRows: columns.join(" "),
        gap: gap,
        gridTemplateAreas: `"a b"
                            "c d"`,
      }}
    >
      {children}
    </div>
  );
}
