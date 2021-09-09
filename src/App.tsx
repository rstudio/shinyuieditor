import { Route, Router } from "preact-router";
import { useCallback, useEffect } from "preact/hooks";
import {
  RecoilRoot,
  useRecoilSnapshot,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import layouts from "./assets/layouts";
import { TheHeader } from "./components/TheHeader";
import { About } from "./routes/About";
import { GridGallery } from "./routes/GridGallery";
import LayoutEditor from "./routes/LayoutEditor";
import { fullAppState, gridTemplateName } from "./state-logic/gridLayout/atoms";

export function App() {
  return (
    <RecoilRoot>
      <AppBody />
    </RecoilRoot>
  );
}

const findLayout = (name: string) =>
  layouts.find((l) => l.name === name) ?? layouts[0];

function AppBody() {
  const templateName = useRecoilValue(gridTemplateName);
  const setTemplateName = useSetRecoilState(gridTemplateName);
  // const setUpNewLayout = useLayoutStateSetter();
  const setUpNewLayout = useSetRecoilState(fullAppState);

  const setupByName = useCallback((name: string) => {
    setUpNewLayout(findLayout(name));
  }, []);
  useEffect(() => {
    setupByName(layouts[0].name);
  }, []);

  return (
    <>
      <TheHeader />
      <DebugObserver />

      <div id="app-body">
        <Router>
          <Route
            path="/"
            component={GridGallery}
            allLayouts={layouts}
            currentLayoutName={templateName}
            chooseLayout={setTemplateName}
          />
          <Route path="/edit" component={LayoutEditor} />
          <Route path="/about" component={About} layoutName={templateName} />
        </Router>
      </div>
    </>
  );
}
function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug("The following atoms were modified:");
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}
