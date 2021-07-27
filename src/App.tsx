import { Route, Router } from "preact-router";
import { useReducer } from "preact/hooks";
import { Header } from "./components/Header";
import { CurrentLayoutCtx, initialState, stateReducer } from "./manageState";
import { About } from "./routes/About";
import { GridGallery } from "./routes/GridGallery";
import LayoutEditor from "./routes/LayoutEditor";

export function App() {
  // This initializes the state variable for the whole app
  const [state, updateState] = useReducer(stateReducer, initialState);

  return (
    // Make the current state available to all child components
    <CurrentLayoutCtx.Provider value={{ state, updateState }}>
      <Header />
      <div id="app-body">
        <Router>
          <Route path="/" component={GridGallery} />
          <Route path="/edit" component={LayoutEditor} />
          <Route path="/about" component={About} />
        </Router>
      </div>
    </CurrentLayoutCtx.Provider>
  );
}
