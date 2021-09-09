import { useRecoilValue } from "recoil";
import { combinedLayoutSizesState } from "../state-logic/gridLayout/atoms";

export function MainGridCSSVariables() {
  const { gap, rows, cols } = useRecoilValue(combinedLayoutSizesState);

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
