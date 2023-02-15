import { CardContainerShowcase } from "./components/cards/Cards.stories";
import { basicGridPage } from "./state/sample_ui_trees/basicGridPage";
import { bslibCards } from "./state/sample_ui_trees/bslibCards";
import type { SUE_Props } from "./SUE";
import { SUE } from "./SUE";

export const SueShowcase = (args: SUE_Props) => {
  return <SUE {...args}></SUE>;
};

export default {
  title: "Full App",
  component: CardContainerShowcase,
  args: {},
};

export const GridApp = () => <SUE defaultTree={basicGridPage}></SUE>;
export const BslibCard = () => <SUE defaultTree={bslibCards}></SUE>;
