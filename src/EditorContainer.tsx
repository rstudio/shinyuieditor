import rstudioLogo from "assets/RStudio-Logo.svg";
import shinyLogo from "assets/Shiny-Logo.png";
import { useEventUpdatedTree } from "components/Shiny-Ui-Elements/Elements/treeUpdateEvents";
import ElementsPalette from "components/Shiny-Ui-Elements/ElementsPalette";
import UiNode from "components/Shiny-Ui-Elements/UiNode";
import {
  NodePath,
  UiNodeProps,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { getInitialState } from "getInitialState";
import * as React from "react";
import { useQuery } from "react-query";
import classes from "./EditorContainer.module.css";
import { SettingsPanel } from "./SettingsPanel";

export const NodeSelectionContext = React.createContext<
  (path: NodePath | null) => void
>((path: NodePath | null) => console.log(`Selected node placeholder`, path));

function EditorContainerWithData({
  initialState,
}: {
  initialState: UiNodeProps;
}) {
  const [selectedPath, setSelectedPath] = React.useState<NodePath | null>(null);

  const tree = useEventUpdatedTree(initialState, sendUiStateToBackend);

  return (
    <NodeSelectionContext.Provider value={setSelectedPath}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.leftSide}>
            <h1 className={classes.title}>Shiny Visual Editor</h1>
            <img src={rstudioLogo} alt="RStudio Logo" />
            <img
              src={shinyLogo}
              style={{ backgroundColor: "var(--rstudio-blue, pink)" }}
              alt="Shiny Logo"
            />
          </div>
        </div>
        <div className={`${classes.elementsPanel} ${classes.titledPanel}`}>
          <h3>Elements</h3>
          <ElementsPalette />
        </div>
        <div className={`${classes.propertiesPanel} ${classes.titledPanel}`}>
          <h3>Properties</h3>
          <SettingsPanel tree={tree} selectedPath={selectedPath} />
        </div>
        <div className={classes.editorHolder}>
          <UiNode {...tree} selectedPath={selectedPath} />
        </div>
      </div>
    </NodeSelectionContext.Provider>
  );
}

export function EditorContainer() {
  const { isLoading, error, data } = useQuery("initial-state", getInitialState);

  if (isLoading) {
    return <h3>Loading initial state from server</h3>;
  }

  if (error || !data) {
    return <h3 style={{ color: "orangered" }}>Error with server request</h3>;
  }

  return <EditorContainerWithData initialState={data} />;
}

function sendUiStateToBackend(state: UiNodeProps) {
  console.log("Sending state to backend", state);
  const stateBlob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });

  fetch("UiDump", { method: "POST", body: stateBlob })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(function (response) {
      console.log("Response after sending state blob", response);
    });
}
