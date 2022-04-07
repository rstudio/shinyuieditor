import React from "react";

import type { Story } from "@ladle/react";
import { SettingsUpdateContext } from "components/Inputs/SettingsUpdateContext";
import type {
  SettingsUpdaterComponent,
  UiContainerNodeComponent,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "components/Shiny-Ui-Elements/uiNodeTypes";

import "../../App.css";
import classes from "./UiElementsShowcase.module.css";
import type { ShinyUiNames } from "./uiNodeTypes";

export const UiElementsShowcase: Story<{
  nameOfElement: ShinyUiNames;
}> = ({ nameOfElement }) => {
  const componentRef = React.useRef<HTMLDivElement>(null);

  const nodeInfo = shinyUiNodeInfo[nameOfElement];

  const defaultSettings = nodeInfo.defaultSettings;

  type NodeSettingsType = typeof defaultSettings;
  const [uiSettings, setUiSettings] =
    React.useState<NodeSettingsType>(defaultSettings);

  React.useEffect(() => {
    setUiSettings(defaultSettings);
  }, [defaultSettings]);

  const NodeComponent =
    nodeInfo.UiComponent as UiContainerNodeComponent<NodeSettingsType>;

  const SettingsInputs =
    nodeInfo.SettingsComponent as SettingsUpdaterComponent<NodeSettingsType>;
  const updateSettings = ({
    name,
    value,
  }: {
    name: string;
    value?: number | string;
  }) => {
    setUiSettings({ ...uiSettings, [name]: value });
  };
  return (
    <div className={classes.container}>
      <div>
        <h1>Ui Component</h1>
        <div className={classes.uiHolder}>
          <NodeComponent
            compRef={componentRef}
            uiChildren={[]}
            uiArguments={uiSettings}
            eventHandlers={{
              onClick: () => {
                console.log(`Clicked the ${nameOfElement} component`);
              },
            }}
            nodeInfo={{ path: [0] }}
          />
        </div>
      </div>
      <div>
        <h1>Settings Panel</h1>
        <SettingsUpdateContext onChange={updateSettings}>
          <SettingsInputs settings={uiSettings} />
        </SettingsUpdateContext>
      </div>
    </div>
  );
};

UiElementsShowcase.args = {
  nameOfElement: "shiny::plotOutput",
};
UiElementsShowcase.argTypes = {
  nameOfElement: {
    control: { type: "select" },
    options: Object.keys(shinyUiNodeInfo),
  },
};
