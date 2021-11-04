import { AreaLabeledGridHolder, GridHolder } from "components/GridHolder";
import parseGridTemplateAreas, {
  TemplatedGridProps,
} from "utils/parseGridTemplateAreas";
import UiPanel, { UiComponentDefinition } from "../UiPanel";
import * as React from "react";
import { useShowDiffs } from "../../../state-logic/useShowChanges";

type Panels = Record<string, UiComponentDefinition>;
type GridAppProps = {
  layout: TemplatedGridProps;
  panels: Panels;
  labelAreas?: boolean;
  onNewState?: (x: Panels) => void;
};

export default function GridApp({
  layout,
  panels: initialPanels,
  labelAreas = false,
  onNewState,
}: GridAppProps) {
  const { uniqueAreas } = parseGridTemplateAreas(layout);

  const [allPanels, setAllPanels] = React.useState(initialPanels);

  React.useEffect(() => onNewState?.(allPanels), [allPanels, onNewState]);
  // useShowDiffs({ val: allPanels });

  const updatePanel = React.useCallback(
    (panelArea: string, newProps: object) => {
      setAllPanels((currentPanels) => {
        const existingPanel = currentPanels[panelArea];
        if (!existingPanel) throw new Error("That panel doesn't exist");
        const newPanels = { ...currentPanels };
        newPanels[panelArea] = {
          componentName: existingPanel.componentName,
          componentProps: newProps,
        };
        return newPanels;
      });
    },
    [setAllPanels]
  );

  const panelAreas = Object.keys(allPanels);

  if (panelAreas.some((area) => !uniqueAreas.includes(area)))
    throw new Error(
      "Tried to place a panel onto an area not in the defined grid layout"
    );

  const panelComponents = panelAreas.map((area) => (
    <UiPanel
      key={area}
      area={area}
      componentDefinition={allPanels[area]}
      onUpdate={(newProps) => updatePanel(area, newProps)}
    />
  ));

  const HolderComp = labelAreas ? AreaLabeledGridHolder : GridHolder;

  return <HolderComp {...layout}>{panelComponents}</HolderComp>;
}
