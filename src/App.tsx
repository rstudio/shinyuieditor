import { Router, Route } from "preact-router";
import { About } from "./routes/About";
import { GridGallery } from "./routes/GridGallery";
import { Header } from "./components/Header";
import LayoutEditor from "./routes/LayoutEditor";

export function App() {
  return (
    <>
      <Header />
      <div id="app-body">
        <Router>
          <Route path="/" component={GridGallery} />
          <Route path="/edit" component={LayoutEditor} />
          <Route path="/about" component={About} />
        </Router>
      </div>
    </>
  );
}
