import { makeMessageDispatcher } from "communication-types/src/BackendConnection";
import { basicGridPage } from "ui-node-definitions/src/sample_ui_trees/basicGridPage";
import { basicNavbarPage } from "ui-node-definitions/src/sample_ui_trees/basicNavbarPage";
import { bslibCards } from "ui-node-definitions/src/sample_ui_trees/bslibCards";
import type { ShinyUiRootNode } from "ui-node-definitions/src/ShinyUiNode";

import { setupStaticBackend } from "./backendCommunication/staticBackend";
import { SUE } from "./SUE";

export const SueShowcase = (args: Parameters<typeof SUE>[0]) => {
  return <SUE {...args}></SUE>;
};

export default {
  title: "Full App",
  component: SUE,
  args: {},
};

function staticDispatchFromTree(defaultTree?: ShinyUiRootNode) {
  return setupStaticBackend({
    messageDispatch: makeMessageDispatcher(),
    showMessages: true,
    defaultInfo: {
      language: "R",
      ui_tree: defaultTree ?? "TEMPLATE_CHOOSER",
    },
  });
}

export const GridApp = () => (
  <SUE backendDispatch={staticDispatchFromTree(basicGridPage)}></SUE>
);
export const BslibCard = () => (
  <SUE backendDispatch={staticDispatchFromTree(bslibCards)}></SUE>
);
export const NavbarPage = () => (
  <SUE backendDispatch={staticDispatchFromTree(basicNavbarPage)}></SUE>
);
