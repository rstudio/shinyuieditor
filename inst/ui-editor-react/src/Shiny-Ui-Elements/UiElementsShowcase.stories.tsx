import React from "react";

import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { DefaultSettingsFromInfo } from "components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import {
  buildStaticFormInfo,
  getDefaultSettings,
} from "components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import { FormBuilder } from "components/Inputs/SettingsFormBuilder/FormBuilder";
import type { FormValuesFromInfo } from "components/Inputs/SettingsFormBuilder/inputFieldTypes";
import type { SettingsUpdateAction } from "components/Inputs/SettingsFormBuilder/SettingsInput/SettingsInput";
import type {
  ArgsWithPotentialUnknowns,
  ShinyUiNode,
  ShinyUiNodeInfo,
  UiNodeComponent,
} from "Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "Shiny-Ui-Elements/uiNodeTypes";

import "../App.css";
import classes from "./UiElementsShowcase.module.css";
import type { ShinyUiNames } from "./uiNodeTypes";

function UiNodeAndSettings<T extends ShinyUiNames>({
  uiName,
  uiArguments,
}: {
  uiName: T;
  uiArguments: ArgsWithPotentialUnknowns<T>;
}) {
  type NodeSettingsType = DefaultSettingsFromInfo<
    ShinyUiNodeInfo[T]["settingsInfo"]
  >;

  const nodeInfo: ShinyUiNodeInfo[T] = shinyUiNodeInfo[uiName];

  const NodeComponent =
    nodeInfo.UiComponent as UiNodeComponent<NodeSettingsType>;

  const currentNode = {
    uiName,
    uiArguments,
    uiChildren: [],
  } as ShinyUiNode;

  // If performance issues happen this can be memoized
  const staticSettingsInfo = buildStaticFormInfo(
    shinyUiNodeInfo[uiName].settingsInfo,
    currentNode
  );

  const [uiSettings, setUiSettings] =
    React.useState<NodeSettingsType>(uiArguments);

  const updateSettings: (name: string, action: SettingsUpdateAction) => void = (
    name,
    action
  ) => {
    if (action.type === "UPDATE") {
      setUiSettings((old) => ({ ...old, [name]: action.value }));
    } else {
      setUiSettings((old) => ({ ...old, [name]: undefined }));
    }
  };

  React.useEffect(() => console.log("UiSettings", uiSettings), [uiSettings]);

  return (
    <div className={classes.container}>
      <div>
        <h1>Ui Component</h1>
        <div className={classes.uiHolder}>
          <NodeComponent
            uiChildren={[]}
            uiArguments={uiSettings}
            path={[0]}
            wrapperProps={{
              onClick: (e) => {
                console.log("Clicked node", e);
              },
              "data-sue-path": "0",
              "data-is-selected-node": false,
              "aria-label": uiName,
            }}
          />
        </div>
      </div>
      <div>
        <h1>Settings Panel</h1>
        <FormBuilder
          settings={uiSettings as FormValuesFromInfo<typeof staticSettingsInfo>}
          settingsInfo={staticSettingsInfo}
          onSettingsChange={updateSettings}
        />
      </div>
    </div>
  );
}

export default {
  title: "Ui Elements Showcase",
  component: UiNodeAndSettings,
} as ComponentMeta<typeof UiNodeAndSettings>;

export const UiElementsShowcase: ComponentStory<
  ({ nameOfElement }: { nameOfElement: ShinyUiNames }) => JSX.Element
> = ({ nameOfElement }) => {
  const defaultSettings = getDefaultSettings(
    shinyUiNodeInfo[nameOfElement].settingsInfo
  );
  return (
    <UiNodeAndSettings uiName={nameOfElement} uiArguments={defaultSettings} />
  );
};

UiElementsShowcase.argTypes = {
  nameOfElement: {
    control: { type: "select" },
    options: Object.keys(shinyUiNodeInfo),
  },
};

UiElementsShowcase.args = {
  nameOfElement: "shiny::plotOutput",
};

// export const UnknownArgs: Story = () => {
//   return (
//     <UiNodeAndSettings
//       uiName={"shiny::sliderInput"}
//       uiArguments={{
//         inputId: "mySlider",
//         label: "Slid your value!",
//         min: 0,
//         max: 12,
//         value: 5,
//         width: "90%",
//         animation: "test",
//       }}
//     />
//   );
// };
