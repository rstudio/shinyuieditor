import "preact/debug";
import { render } from "preact";
import { App } from "./App";
import { html } from "htm/preact";

import "./index.css";

render(html`<${App} />`, document.getElementById("app")!);
