import * as React from "react";

import rstudioLogo from "assets/RStudio-Logo.svg";
import shinyLogo from "assets/Shiny-Logo.png";
import { CurrentDraggedNodeProvider } from "components/Shiny-Ui-Elements/DragAndDropHelpers/useCurrentDraggedNode";
import type { ShinyUiNode } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import ElementsPalette from "components/Shiny-Ui-Elements/ElementsPalette";
import UiNode from "components/Shiny-Ui-Elements/UiNode";
import { useEventUpdatedTree } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/treeUpdateEvents";
import { getInitialState } from "getInitialState";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import type { RootState } from "state/store";

import classes from "./EditorContainer.module.css";
import { NodeSelectionProvider } from "./NodeSelectionState";
import { SettingsPanel } from "./SettingsPanel/SettingsPanel";

function EditorContainerWithData({
  initialState,
}: {
  initialState: ShinyUiNode;
}) {
  const tree = useSelector((state: RootState) => state.uiTree);

  console.log({ tree });
  const { selectedPath, setSelectedPath } = useEventUpdatedTree(
    initialState,
    sendUiStateToBackend
  );

  return (
    <CurrentDraggedNodeProvider>
      <NodeSelectionProvider selectionState={[selectedPath, setSelectedPath]}>
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
            <SettingsPanel tree={tree} />
          </div>
          <div className={classes.editorHolder}>
            <UiNode {...tree} />
          </div>
        </div>
      </NodeSelectionProvider>
    </CurrentDraggedNodeProvider>
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

function sendUiStateToBackend(state: ShinyUiNode) {
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
