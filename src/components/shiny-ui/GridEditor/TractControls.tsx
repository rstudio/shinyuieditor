/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { CSSUnitInput } from "components/CSSUnitInput";
import { CSSMeasure } from "GridTypes";
import React from "react";
import { TractDirection } from "state-logic/gridLayout/atoms";
import { ParsedGridTemplate } from "utils/gridTemplates/parseGridTemplateAreas";
import resizeTract from "utils/gridTemplates/resizeTract";
import { SetLayoutContext } from ".";

const inputWidth = "110px";
export function TractControls({
  sizes,
}: {
  sizes: ParsedGridTemplate["sizes"];
}) {
  return (
    <>
      {sizes.rows.map((size, i) => (
        <TractControlMemo key={i} dir="rows" size={size} index={i} />
      ))}
      {sizes.cols.map((size, i) => (
        <TractControlMemo key={i} dir="cols" size={size} index={i} />
      ))}
    </>
  );
}

function TractControl({
  dir,
  index,
  size,
}: {
  dir: TractDirection;
  index: number;
  size: CSSMeasure;
}) {
  const setLayout = React.useContext(SetLayoutContext);
  const tractIndex = index + 1;
  const positionStyle = {
    [dir === "rows" ? "gridRow" : "gridColumn"]: tractIndex,
  };

  return (
    <div
      css={dir === "rows" ? rowControlStyles : colControlStyles}
      style={positionStyle}
    >
      <CSSUnitInput
        value={size}
        w={inputWidth}
        onChange={(newSize) => {
          setLayout?.((layout) =>
            resizeTract(layout, { dir, index: tractIndex }, newSize)
          );
        }}
      />
    </div>
  );
}
const TractControlMemo = React.memo(TractControl);

const rowControlStyles = css({
  width: "var(--row-gutter)",
  marginLeft: "calc(-1*(var(--row-gutter) + var(--gap)))",
  gridColumn: 1,
  display: "grid",
  justifyContent: "end",
  alignContent: "center",
});

const colControlStyles = css({
  height: "var(--col-gutter)",
  marginTop: "calc(-1*(var(--col-gutter) + var(--gap)))",
  gridRow: 1,
  display: "grid",
  alignContent: "end",
  justifyContent: "center",
});
