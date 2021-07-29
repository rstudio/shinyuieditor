import { Route, Router } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import { Header } from "./components/Header";
import layouts from "./layouts";
import { About } from "./routes/About";
import { GridGallery } from "./routes/GridGallery";
import LayoutEditor from "./routes/LayoutEditor";

export function App() {
  const [templateName, setTemplateName] = useState(layouts[0].name);
  const [currentLayout, updateLayout] = useState(layouts[0]);

  // Watch for changes in template name and update the current layout to be the
  // fresh un-edited version of the layout by that name
  useEffect(() => {
    updateLayout(layouts.find((l) => l.name === templateName) ?? currentLayout);
  }, [templateName]);

  return (
    <>
      <Header />
      <div id="app-body">
        <Router>
          <Route
            path="/"
            component={GridGallery}
            allLayouts={layouts}
            currentLayoutName={templateName}
            chooseLayout={setTemplateName}
          />
          <Route path="/edit" component={LayoutEditor} layout={currentLayout} />
          <Route path="/about" component={About} layout={currentLayout} />
        </Router>
      </div>
    </>
  );
}
