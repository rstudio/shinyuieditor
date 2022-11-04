import React from "react";

import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { DefaultSettingsFromInfo } from "components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import {
  buildStaticFormInfo,
  getDefaultSettings,
} from "components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import { FormBuilder } from "components/Inputs/SettingsFormBuilder/FormBuilder";
import type {
  FormInfo,
  FormValuesFromInfo,
} from "components/Inputs/SettingsFormBuilder/inputFieldTypes";
import type { SettingsUpdateAction } from "components/Inputs/SettingsFormBuilder/SettingsInput/SettingsInput";
import omit from "just-omit";
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
  const [infoToRender, setInfoToRender] = React.useState<{
    node: ShinyUiNode;
    Comp: UiNodeComponent<NodeSettingsType>;
    settingsInfo: FormInfo;
  } | null>(null);

  React.useEffect(() => {
    const nodeInfo = shinyUiNodeInfo[uiName];

    // If performance issues happen this can be memoized
    const newNode = {
      uiName,
      uiArguments,
      uiChildren: [],
    } as ShinyUiNode;

    setInfoToRender({
      node: newNode,
      Comp: nodeInfo.UiComponent as UiNodeComponent<NodeSettingsType>,
      settingsInfo: buildStaticFormInfo(nodeInfo.settingsInfo, newNode),
    });
  }, [uiArguments, uiName]);

  const updateSettings: (name: string, action: SettingsUpdateAction) => void =
    React.useCallback((name, action) => {
      setInfoToRender((info) => {
        if (!info) return null;
        const { node } = info;

        const prevSettings = node.uiArguments;
        const newSettings =
          action.type === "UPDATE"
            ? { ...prevSettings, [name]: action.value }
            : omit(prevSettings, name as keyof typeof prevSettings);

        const newNode = {
          ...node,
          uiArguments: newSettings,
        } as ShinyUiNode;

        return {
          ...info,
          node: newNode,
          settingsInfo: buildStaticFormInfo(
            shinyUiNodeInfo[node.uiName].settingsInfo,
            newNode
          ),
        };
      });
    }, []);

  if (!infoToRender) return <div>Setting up the settings info...</div>;

  const { node, Comp, settingsInfo } = infoToRender;

  return (
    <div className={classes.container}>
      <div>
        <h1>Ui Component</h1>
        <div className={classes.uiHolder}>
          <Comp
            uiChildren={[]}
            uiArguments={node.uiArguments}
            path={[0]}
            wrapperProps={{
              onClick: (e) => {
                console.log("Clicked node", e);
              },
              "data-sue-path": "0",
              "data-is-selected-node": false,
              "aria-label": node.uiName,
            }}
          />
        </div>
      </div>
      <div>
        <h1>Settings Panel</h1>
        <FormBuilder
          settings={node.uiArguments as FormValuesFromInfo<typeof settingsInfo>}
          settingsInfo={settingsInfo}
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
