/** @jsxImportSource @emotion/react */
import * as React from "react";

import { useRecoilValue } from "recoil";
import { combinedLayoutSizesState } from "../state-logic/gridLayout/atoms";

export function MainGridCSSVariables() {
  const { gap, rows, cols } = useRecoilValue(combinedLayoutSizesState);

  if (rows.length === 0 || cols.length === 0) return null;
  const styleBody = `
  body {
    --main-grid-columns: ${cols.join(" ")};
    --main-grid-rows: ${rows.join(" ")};
    --main-grid-gap: ${gap}; 
    --gap: ${gap};
  }
  `;

  return <style>{styleBody}</style>;
}
