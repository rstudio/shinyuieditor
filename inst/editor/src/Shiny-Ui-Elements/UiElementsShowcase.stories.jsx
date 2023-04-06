// The very dynamic nature of this story was causing huge headaches for
// typescript. So since it's not in the "production path" I'm just going to have
// it be javascript.
import React from "react";

import omit from "just-omit";

import "../App.css";

import { getUiNodeInfo } from "../Shiny-Ui-Elements/uiNodeTypes";
import {
  buildStaticFormInfo,
  getDefaultSettings,
} from "../components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import { FormBuilder } from "../components/Inputs/SettingsFormBuilder/FormBuilder";

import classes from "./UiElementsShowcase.module.css";

import { shinyids } from "./uiNodeTypes";
function UiNodeAndSettings({ id, uiArguments }) {
  const [infoToRender, setInfoToRender] = React.useState(null);

  React.useEffect(() => {
    const nodeInfo = getUiNodeInfo(id);

    // If performance issues happen this can be memoized
    const newNode = {
      id,
      uiArguments,
      uiChildren: [],
    };

    setInfoToRender({
      node: newNode,
      Comp: nodeInfo.UiComponent,
      settingsInfo: buildStaticFormInfo(nodeInfo.settingsInfo, newNode),
    });
  }, [uiArguments, id]);

  const updateSettings = React.useCallback((name, action) => {
    setInfoToRender((info) => {
      if (!info) return null;
      const { node } = info;

      const prevSettings = node.uiArguments;
      const newSettings =
        action.type === "UPDATE"
          ? { ...prevSettings, [name]: action.value }
          : omit(prevSettings, name);

      const newNode = {
        ...node,
        uiArguments: newSettings,
      };

      return {
        ...info,
        node: newNode,
        settingsInfo: buildStaticFormInfo(
          getUiNodeInfo(node.id).settingsInfo,
          newNode
        ),
      };
    });
  }, []);

  if (!infoToRender) return <div>Setting up the settings info...</div>;

  // const { node, Comp, settingsInfo } = infoToRender;
  const Comp = infoToRender.Comp;

  return (
    <div className={classes.container}>
      <div>
        <h1>Ui Component</h1>
        <div className={classes.uiHolder}>
          <Comp
            uiChildren={[]}
            uiArguments={infoToRender.node.uiArguments}
            path={[0]}
            wrapperProps={{
              onClick: (e) => {
                console.log("Clicked node", e);
              },
              "data-sue-path": "0",
              "data-is-selected-node": false,
              "aria-label": infoToRender.node.id,
            }}
          />
        </div>
      </div>
      <div>
        <h1>Settings Panel</h1>
        <FormBuilder
          settings={infoToRender.node.uiArguments}
          settingsInfo={infoToRender.settingsInfo}
          onSettingsChange={updateSettings}
        />
      </div>
    </div>
  );
}

export default {
  title: "Ui Elements Showcase",
  component: UiNodeAndSettings,
};

export const UiElementsShowcase = ({ nameOfElement }) => {
  const defaultSettings = getDefaultSettings(
    getUiNodeInfo(nameOfElement).settingsInfo
  );

  return <UiNodeAndSettings id={nameOfElement} uiArguments={defaultSettings} />;
};

UiElementsShowcase.argTypes = {
  nameOfElement: {
    control: { type: "select" },
    options: shinyids,
  },
};

UiElementsShowcase.args = {
  nameOfElement: "shiny::plotOutput",
};

// export const UnknownArgs: Story = () => {
//   return (
//     <UiNodeAndSettings
//       id={"shiny::sliderInput"}
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
