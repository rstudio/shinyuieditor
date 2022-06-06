import React from "react";

import type { Story } from "@ladle/react";
import type { OnChangeCallback } from "components/Inputs/SettingsUpdateContext";
import { SettingsUpdateContext } from "components/Inputs/SettingsUpdateContext";
import type {
  SettingsUpdaterComponent,
  ShinyUiNodeInfo,
  UiContainerNodeComponent,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "components/Shiny-Ui-Elements/uiNodeTypes";

import "../../App.css";
import classes from "./UiElementsShowcase.module.css";
import type { ShinyUiNames } from "./uiNodeTypes";

function UiNodeAndSettings<T extends ShinyUiNames>({
  uiName,
  uiArguments,
}: {
  uiName: T;
  uiArguments: ShinyUiNodeInfo[T]["defaultSettings"];
}) {
  type NodeSettingsType = ShinyUiNodeInfo[T]["defaultSettings"];

  const nodeInfo: ShinyUiNodeInfo[T] = shinyUiNodeInfo[uiName];

  const NodeComponent =
    nodeInfo.UiComponent as UiContainerNodeComponent<NodeSettingsType>;

  const SettingsInputs =
    nodeInfo.SettingsComponent as SettingsUpdaterComponent<NodeSettingsType>;

  const [uiSettings, setUiSettings] =
    React.useState<NodeSettingsType>(uiArguments);

  const componentRef = React.useRef<HTMLDivElement>(null);

  const updateSettings: OnChangeCallback = ({ name, value }) => {
    setUiSettings({ ...uiSettings, [name]: value });
  };

  React.useEffect(() => setUiSettings(uiArguments), [uiArguments, uiName]);

  React.useEffect(() => console.log("UiSettings", uiSettings), [uiSettings]);

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
              onClick: () => console.log(`Clicked the ${uiName} component`),
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
}

export const UiElementsShowcase: Story<{
  nameOfElement: ShinyUiNames;
}> = ({ nameOfElement }) => {
  return (
    <UiNodeAndSettings
      uiName={nameOfElement}
      uiArguments={shinyUiNodeInfo[nameOfElement].defaultSettings}
    />
  );
};

const uiNodeNames = Object.keys(shinyUiNodeInfo);
UiElementsShowcase.argTypes = {
  nameOfElement: {
    control: { type: "select" },
    options: uiNodeNames,
  },
};

UiElementsShowcase.args = {
  nameOfElement: "shiny::plotOutput",
};
