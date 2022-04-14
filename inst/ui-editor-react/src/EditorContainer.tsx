import * as React from "react";

import rstudioLogo from "assets/RStudio-Logo.svg";
import shinyLogo from "assets/Shiny-Logo.png";
import AppPreview from "components/AppPreview";
import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";
import UiNode from "components/UiNode";
import { CurrentDraggedNodeProvider } from "DragAndDropHelpers/useCurrentDraggedNode";
import ElementsPalette from "ElementsPalette";
import { useDispatch, useSelector } from "react-redux";
import { useGetInitialStateQuery } from "state/getInitialState";
import { sendUiStateToBackend } from "state/sendUiStateToBackend";
import type { RootState } from "state/store";
import { backupUiTree, INIT_STATE } from "state/uiTree";

import { AppTour } from "./AppTour";
import { UndoRedoButtons } from "./components/UndoRedoButtons";
import classes from "./EditorContainer.module.css";
import { SettingsPanel } from "./SettingsPanel/SettingsPanel";

function EditorContainerWithData({
  // We use a pre-build ui tree in the case of no initial state being provide,
  // which indicates we're in a client-side-only mode
  initialState = backupUiTree,
}: {
  initialState?: ShinyUiNode;
}) {
  const dispatch = useDispatch();

  const tree = useSelector((state: RootState) => state.uiTree);

  React.useEffect(() => {
    if (!initialState) return;
    dispatch(INIT_STATE({ initialState }));
  }, [dispatch, initialState]);

  React.useEffect(() => {
    sendUiStateToBackend(tree);
  }, [tree]);

  return (
    <CurrentDraggedNodeProvider>
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
          <AppTour />
          <UndoRedoButtons />
        </div>
        <div
          className={`${classes.elementsPanel} ${classes.titledPanel} elements-panel`}
        >
          <h3>Elements</h3>
          <ElementsPalette />
        </div>
        <div className={classes.editorHolder}>
          <UiNode {...tree} />
        </div>
        <div className={`${classes.propertiesPanel} ${classes.titledPanel}`}>
          <h3>Properties</h3>
          <SettingsPanel tree={tree} />
          <AppPreview />
        </div>
      </div>
    </CurrentDraggedNodeProvider>
  );
}

export function EditorContainer() {
  const { isLoading, error, data } = useGetInitialStateQuery("test");

  if (isLoading) {
    return <h3>Loading initial state from server</h3>;
  }

  if (error || !data) {
    console.error(
      "Error retreiving app template from server. Running in static mode",
      error ?? "no error"
    );
  }

  return <EditorContainerWithData initialState={data} />;
}
