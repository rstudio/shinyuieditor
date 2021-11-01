import { AreaLabeledGridHolder, GridHolder } from "components/GridHolder";
import parseGridTemplateAreas, {
  TemplatedGridProps,
} from "utils/parseGridTemplateAreas";
import UiPanel, { UiComponentDefinition } from "./UiPanel";

type GridAppProps = {
  layout: TemplatedGridProps;
  panels: Record<string, UiComponentDefinition>;
  labelAreas?: boolean;
};

export default function GridApp({
  layout,
  panels,
  labelAreas = false,
}: GridAppProps) {
  const { uniqueAreas } = parseGridTemplateAreas(layout);

  const panelAreas = Object.keys(panels);

  if (panelAreas.some((area) => !uniqueAreas.includes(area)))
    throw new Error(
      "Tried to place a panel onto an area not in the defined grid layout"
    );

  const panelComponents = panelAreas.map((area) => (
    <UiPanel key={area} area={area} componentDefinition={panels[area]} />
  ));

  const HolderComp = labelAreas ? AreaLabeledGridHolder : GridHolder;

  return <HolderComp {...layout}>{panelComponents}</HolderComp>;
}
