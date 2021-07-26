import { Router, Route } from "preact-router";
import About from "./components/About";
import GridGallery from "./components/GridGallery";
import Header from "./components/Header";

export function App() {
  return (
    <>
      <Header />
      <Router>
        <Route path="/" component={GridGallery} />
        <Route path="/about" component={About} />
      </Router>
    </>
  );
}
