import * as React from "react";

import AppPreview from "components/AppPreview";
import SvgShinyLogo from "components/Icons/ShinyLogo";
import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";
import UiNode from "components/UiNode";
import { CurrentDraggedNodeProvider } from "DragAndDropHelpers/useCurrentDraggedNode";
import ElementsPalette from "ElementsPalette";
import PortalModal from "PortalModal";
import { useDispatch, useSelector } from "react-redux";
import { useGetInitialStateQuery } from "state/getInitialState";
import { sendUiStateToBackend } from "state/sendUiStateToBackend";
import type { RootState } from "state/store";
import { backupUiTree, initialUiTree, INIT_STATE } from "state/uiTree";

import { AppTour } from "./AppTour";
import { UndoRedoButtons } from "./components/UndoRedoButtons/UndoRedoButtons";
import classes from "./EditorContainer.module.css";
import { SettingsPanel } from "./SettingsPanel/SettingsPanel";

export const PROPERTIES_PANEL_WIDTH_PX = 236;

const sizes_inline_styles = {
  "--properties-panel-width": `${PROPERTIES_PANEL_WIDTH_PX}px`,
} as React.CSSProperties;

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
    if (tree === initialUiTree) return;
    sendUiStateToBackend(tree);
  }, [tree]);

  return (
    <CurrentDraggedNodeProvider>
      <div className={classes.container} style={sizes_inline_styles}>
        <div className={classes.header}>
          <SvgShinyLogo
            className={classes.shinyLogo}
            style={{ backgroundColor: "var(--rstudio-blue, pink)" }}
          />
          <h1 className={classes.title}>Shiny UI Editor</h1>
          <div className={classes.rightSide}>
            <AppTour />
            <div className={classes.divider} />
            <UndoRedoButtons />
          </div>
        </div>
        <div
          className={`${classes.elementsPanel} ${classes.titledPanel} elements-panel`}
        >
          <h3>Elements</h3>
          <ElementsPalette />
        </div>
        <div className={classes.editorHolder + " app-view"}>
          <UiNode {...tree} />
        </div>
        <div className={`${classes.propertiesPanel}`}>
          <div className={`${classes.titledPanel} properties-panel`}>
            <h3>Properties</h3>
            <SettingsPanel tree={tree} />
          </div>
          <div className={`${classes.titledPanel} app-preview`}>
            <AppPreview />
          </div>
        </div>
      </div>
      <LostConnectionPopup />
    </CurrentDraggedNodeProvider>
  );
}

function LostConnectionPopup() {
  const connectedToServer = useSelector(
    (state: RootState) => state.connectedToServer
  );

  if (connectedToServer) return null;

  return (
    <PortalModal
      onConfirm={() => console.log("User confirmed")}
      onCancel={() => console.log("user canceled")}
    >
      <p style={{ color: "var(--red, pink)", textAlign: "center" }}>
        Lost connection to backend. Check console where editor was launched for
        details.
      </p>
    </PortalModal>
  );
}

export function EditorContainer() {
  const { isLoading, error, data } = useGetInitialStateQuery("test");

  if (isLoading) {
    return <h3>Loading initial state from server</h3>;
  }

  if (error || !data) {
    console.warn(
      "Error retreiving app template from server. Running in static mode",
      error ?? "no error"
    );
  }

  return <EditorContainerWithData initialState={data} />;
}
