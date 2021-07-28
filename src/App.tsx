import { Route, Router } from "preact-router";
import { useState } from "preact/hooks";
import { Header } from "./components/Header";
import layouts from "./layouts";
import { About } from "./routes/About";
import { GridGallery } from "./routes/GridGallery";
import LayoutEditor from "./routes/LayoutEditor";

export function App() {
  const [currentLayout, updateLayout] = useState(layouts[0]);

  return (
    <>
      <Header />
      <div id="app-body">
        <Router>
          <Route
            path="/"
            component={GridGallery}
            layout={currentLayout}
            updateLayout={updateLayout}
          />
          <Route path="/edit" component={LayoutEditor} layout={currentLayout} />
          <Route path="/about" component={About} layout={currentLayout} />
        </Router>
      </div>
    </>
  );
}
