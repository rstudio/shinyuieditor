import { html } from "htm/preact";

export default function GridPreviewItem(props: {
  rows: [string, string];
  cols: [string, string];
}) {
  return html`
    <div
      class="grid-preview-item"
      style="
        grid-column: ${props.cols.join("/")};
        grid-row: ${props.rows.join("/")};
        background-color: var(--rstudio-blue, forestgreen);
        border-radius: var(--corner-radius);
      "
    ></div>
  `;
}
