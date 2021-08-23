import { Route, Router } from "preact-router";
import { useState } from "preact/hooks";
import { RecoilRoot } from "recoil";
import layouts from "./assets/layouts";
import { TheHeader } from "./components/TheHeader";
import { About } from "./routes/About";
import { GridGallery } from "./routes/GridGallery";
import LayoutEditor from "./routes/LayoutEditor";
const findLayout = (name: string) =>
  layouts.find((l) => l.name === name) ?? layouts[0];

export function App() {
  const [templateName, setTemplateName] = useState(layouts[0].name);

  return (
    <RecoilRoot>
      <TheHeader />
      <div id="app-body">
        <Router>
          <Route
            path="/"
            component={GridGallery}
            allLayouts={layouts}
            currentLayoutName={templateName}
            chooseLayout={setTemplateName}
          />
          <Route
            path="/edit"
            component={LayoutEditor}
            startingLayout={findLayout(templateName)}
          />
          <Route path="/about" component={About} layoutName={templateName} />
        </Router>
      </div>
    </RecoilRoot>
  );
}
