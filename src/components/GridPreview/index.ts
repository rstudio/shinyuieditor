import { html } from "htm/preact";
import type { GridLayoutDef } from "../../types";
import GridPreviewItem from "../GridPreviewItem";
import "./style.css";

export default function GridPreview(props: {
  layout: GridLayoutDef;
  displaySize: number;
}) {
  const {
    displaySize = 200,
    layout: { name, rows, cols, gap, items = [] },
  } = props;
  const scale = 1000 / displaySize;

  // Dont calc with relative units ()
  const scaleUnit = (unit: string) =>
    unit.includes("fr") || unit.includes("auto")
      ? unit
      : `calc(${unit}/ ${scale})`;

  return html`
    <div
      style="--shown-size: ${displaySize}px;
             --corner-radius: ${20 / scale}px"
    >
      <h3>${name}</h3>
      <div
        class="grid-preview"
        style="grid-template-columns: ${cols.map(scaleUnit).join(" ")};
               grid-template-rows: ${rows.map(scaleUnit).join(" ")};
               gap: calc(${gap} / ${scale});
               padding: ${30 / scale}px;"
      >
        ${items.map(
          ({ rows, cols }) =>
            html` <${GridPreviewItem} rows=${rows} cols=${cols} /> `
        )}
      </div>
    </div>
  `;
}
