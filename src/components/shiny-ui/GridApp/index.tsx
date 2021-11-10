import { AreaLabeledGridHolder, GridHolder } from "components/GridHolder";
import omit from "just-omit";
import * as React from "react";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import { ShinyUiNameAndProps } from "../componentTypes";
import UiChooser from "../UiChooser";
import UiPanel from "../UiPanel";

type Panels = Record<string, ShinyUiNameAndProps>;
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

        // This needs some better typing so we know newProps will be the proper
        // type for the given existingPanel name
        newPanels[panelArea] = {
          componentName: existingPanel.componentName,
          componentProps: newProps,
        } as ShinyUiNameAndProps;
        return newPanels;
      });
    },
    [setAllPanels]
  );

  const deletePanel = React.useCallback(
    (area: string) => setAllPanels((panels) => omit(panels, area)),
    [setAllPanels]
  );

  const addPanel = React.useCallback(
    (area: string, newPanel: ShinyUiNameAndProps) => {
      setAllPanels((panels) => ({ ...panels, [area]: newPanel }));
    },
    [setAllPanels]
  );

  const panelAreas = Object.keys(allPanels);

  if (panelAreas.some((area) => !uniqueAreas.includes(area)))
    throw new Error(
      "Tried to place a panel onto an area not in the defined grid layout"
    );

  const unusedAreas = uniqueAreas.filter((area) => !panelAreas.includes(area));

  const HolderComp = labelAreas ? AreaLabeledGridHolder : GridHolder;

  return (
    <HolderComp {...layout}>
      {panelAreas.map((area) => (
        <UiPanel
          key={area}
          area={area}
          componentDefinition={allPanels[area]}
          onUpdate={(newProps) => updatePanel(area, newProps)}
          onDelete={() => deletePanel(area)}
        />
      ))}
      {unusedAreas.map((area) => (
        <UiChooser key={area} area={area} onChoose={(x) => addPanel(area, x)} />
      ))}
    </HolderComp>
  );
}
