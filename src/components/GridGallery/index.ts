import { html } from "htm/preact";
import layouts from "../../layouts";
import GridPreview from "../GridPreview";
import "./style.css";

export default function GridGallery() {
  return html`
    <h1 class="title">Preact Layout Gallery!</h1>
    <div class="grid-gallery">
      ${layouts.map(
        (layout) => html`<${GridPreview} layout=${layout} displaySize=${200} />`
      )}
    </div>
  `;
}
