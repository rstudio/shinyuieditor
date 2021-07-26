import { html } from "htm/preact";
import Router from "preact-router";
import About from "./components/About";
import GridGallery from "./components/GridGallery";
import Header from "./components/Header";

export function App() {
  return html`
  <${Header} />
  <${Router}>
    <${GridGallery} path="/"/>
    <${About} path="/about" />
  </${Router}>
  `;
}
