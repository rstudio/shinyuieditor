import { staticDispatchFromTree } from "./backendCommunication/staticBackend";
import { basicNavbarPage } from "./python-parsing/pythonTreesitterToUiTree.test";
import { SUE } from "./SUE";
import { basicGridPage } from "./ui-node-definitions/sample_ui_trees/basicGridPage";
import { bslibCards } from "./ui-node-definitions/sample_ui_trees/bslibCards";

export const SueShowcase = (args: Parameters<typeof SUE>[0]) => {
  return <SUE {...args}></SUE>;
};

export default {
  title: "Full App",
  component: SUE,
  args: {},
};

export const GridApp = () => (
  <SUE backendDispatch={staticDispatchFromTree(basicGridPage)}></SUE>
);
export const BslibCard = () => (
  <SUE backendDispatch={staticDispatchFromTree(bslibCards)}></SUE>
);
export const NavbarPage = () => (
  <SUE backendDispatch={staticDispatchFromTree(basicNavbarPage)}></SUE>
);
