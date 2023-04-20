import { basicGridPage } from "ui-node-definitions/src/sample_ui_trees/basicGridPage";
import { basicNavbarPage } from "ui-node-definitions/src/sample_ui_trees/basicNavbarPage";
import { bslibCards } from "ui-node-definitions/src/sample_ui_trees/bslibCards";
import type { SUE_Props } from "./SUE";
import { SUE } from "./SUE";

export const SueShowcase = (args: SUE_Props) => {
  return <SUE {...args}></SUE>;
};

export default {
  title: "Full App",
  component: SUE,
  args: {},
};

export const GridApp = () => <SUE defaultTree={basicGridPage}></SUE>;
export const BslibCard = () => <SUE defaultTree={bslibCards}></SUE>;
export const NavbarPage = () => <SUE defaultTree={basicNavbarPage}></SUE>;
