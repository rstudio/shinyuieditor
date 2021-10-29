import { AreaLabeledGridHolder } from "components/GridHolder";
import parseGridTemplateAreas, {
  TemplatedGridProps,
} from "utils/parseGridTemplateAreas";
import { UiComponentDefinition } from "./ShinyUiComponent";
import UiPanel from "./UiPanel";

type GridAppProps = {
  layout: TemplatedGridProps;
  panels: Record<string, UiComponentDefinition>;
};

export default function GridApp({ layout, panels }: GridAppProps) {
  const { uniqueAreas } = parseGridTemplateAreas(layout);

  const panelAreas = Object.keys(panels);
  const validPanelAreas = panelAreas.every((area) =>
    uniqueAreas.includes(area)
  );

  if (!validPanelAreas)
    throw new Error("Make sure your areas match the specified grid layout");

  const panelComponents = panelAreas.map((area) => (
    <UiPanel area={area} componentDefinition={panels[area]} />
  ));

  return (
    <AreaLabeledGridHolder {...layout}>{panelComponents}</AreaLabeledGridHolder>
  );
}
