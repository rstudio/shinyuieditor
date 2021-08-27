import { useRecoilValue } from "recoil";
import {
  allRowsState,
  gapState,
  gridColsState,
} from "../state-logic/gridLayoutAtoms";

export function MainGridCSSVariables() {
  const gap = useRecoilValue(gapState);
  const rows = useRecoilValue(allRowsState);
  const cols = useRecoilValue(gridColsState);

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
