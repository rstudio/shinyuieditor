import React from "react";

import type { ComponentStory } from "@storybook/react";
import type {
  SettingsUpdaterComponent,
  UiContainerNodeComponent,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "components/Shiny-Ui-Elements/uiNodeTypes";

import classes from "./UiElementsShowcase.module.css";
import type { ShinyUiNames } from "./uiNodeTypes";

function UiElementsShowcase({
  nameOfElement,
}: {
  nameOfElement: ShinyUiNames;
}) {
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
        <SettingsInputs settings={uiSettings} onChange={setUiSettings} />
      </div>
    </div>
  );
}

export default {
  title: "Ui Elements Showcase",
  component: UiElementsShowcase,
  argTypes: {
    nameOfElement: { type: "select", options: Object.keys(shinyUiNodeInfo) },
  },
};

type NewType = ComponentStory<typeof UiElementsShowcase>;

const Template: NewType = (args) => <UiElementsShowcase {...args} />;

export const Default = Template.bind({});
Default.args = {
  nameOfElement: "shiny::plotOutput",
};
