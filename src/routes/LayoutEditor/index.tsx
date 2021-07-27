import { GridCard } from "../../components/GridCard";
import "./style.css";

export default function LayoutEditor() {
  return (
    <div id="layout-editor">
      <GridCard title="Settings" gridArea="settings" />
      <GridCard title="Instructions" gridArea="instructions" />
      <GridCard title="Elements" gridArea="elements" />
      <GridCard title="Editor" gridArea="editor" />
    </div>
  );
}
