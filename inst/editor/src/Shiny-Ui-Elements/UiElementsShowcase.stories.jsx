// The very dynamic nature of this story was causing huge headaches for
// typescript. So since it's not in the "production path" I'm just going to have
// it be javascript.
import React from "react";

import omit from "just-omit";

import ReduxProvider from "../state/ReduxProvider";

import "../App.css";

import { shinyids } from "ui-node-definitions/src/uiNodeTypes";
import { getUiNodeInfo } from "./registered_ui_nodes";
import {
  buildStaticFormInfo,
  getDefaultSettings,
} from "../components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import { FormBuilder } from "../components/Inputs/SettingsFormBuilder/FormBuilder";

import classes from "./UiElementsShowcase.module.css";

function UiNodeAndSettings({ id, namedArgs }) {
  const [infoToRender, setInfoToRender] = React.useState(null);

  React.useEffect(() => {
    const nodeInfo = getUiNodeInfo(id);

    // If performance issues happen this can be memoized
    const newNode = {
      id,
      namedArgs,
      children: [],
    };

    setInfoToRender({
      node: newNode,
      Comp: nodeInfo.UiComponent,
      settingsInfo: buildStaticFormInfo(nodeInfo.settingsInfo, newNode),
    });
  }, [namedArgs, id]);

  const updateSettings = React.useCallback((name, action) => {
    setInfoToRender((info) => {
      if (!info) return null;
      const { node } = info;

      const prevSettings = node.namedArgs;
      const newSettings =
        action.type === "UPDATE"
          ? { ...prevSettings, [name]: action.value }
          : omit(prevSettings, name);

      const newNode = {
        ...node,
        namedArgs: newSettings,
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
    <ReduxProvider>
      <div className={classes.container} key={id}>
        <div>
          <h1>Ui Component</h1>
          <div className={classes.uiHolder}>
            <Comp
              children={[]}
              namedArgs={infoToRender.node.namedArgs}
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
            settings={infoToRender.node.namedArgs}
            settingsInfo={infoToRender.settingsInfo}
            onSettingsChange={updateSettings}
          />
        </div>
      </div>
    </ReduxProvider>
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
  console.log("All IDs", shinyids);

  return <UiNodeAndSettings id={nameOfElement} namedArgs={defaultSettings} />;
};

UiElementsShowcase.argTypes = {
  nameOfElement: {
    control: { type: "select" },
    options: [...shinyids],
  },
};

UiElementsShowcase.args = {
  nameOfElement: "plotOutput",
};

// export const UnknownArgs: Story = () => {
//   return (
//     <UiNodeAndSettings
//       id={"shiny::sliderInput"}
//       namedArgs={{
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
