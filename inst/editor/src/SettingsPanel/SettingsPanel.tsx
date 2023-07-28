import React from "react";

import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";
import { getUiNodeInfo } from "ui-node-definitions/src/uiNodeTypes";

import DeleteNodeButton from "../components/DeleteNodeButton";
import { GeneralErrorView } from "../components/ErrorCatcher/GeneralErrorView";
import { buildStaticFormInfo } from "../components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import type { CustomFormRenderFn } from "../components/Inputs/SettingsFormBuilder/FormBuilder";
import { FormBuilder } from "../components/Inputs/SettingsFormBuilder/FormBuilder";
import { PanelHeader } from "../EditorLayout/PanelHeader";
import { getUiNodeSettingsRenderer } from "../Shiny-Ui-Elements/registered_ui_nodes";
import {
  generateGhIssueURL,
  generateSerializedStateForError,
} from "../utils/generate_issue_reports";

import { GoToSourceBtns } from "./GoToSourceBtns";
import PathBreadcrumb from "./PathBreadcrumb";
// import PathBreadcrumb from "./PathBreadcrumbLinear";
import classes from "./SettingsPanel.module.css";
import { useUpdateSettings } from "./useUpdateSettings";

export function SettingsPanel({ tree }: { tree: ShinyUiNode }) {
  const {
    currentNode,
    updateArgumentsByName,
    deleteArgumentByName,
    selectedPath,
    setNodeSelection,
  } = useUpdateSettings(tree);

  if (selectedPath === null) {
    return <div>Select an element to edit properties</div>;
  }
  if (currentNode === null) {
    return (
      <div>Error finding requested node at path {selectedPath.join(".")}</div>
    );
  }

  const isRootNode = selectedPath.length === 0;

  const { id, namedArgs } = currentNode;

  // If performance issues happen this can be memoized
  const nodeInfo = getUiNodeInfo(id);
  const staticSettingsInfo = buildStaticFormInfo(
    nodeInfo.settingsInfo,
    currentNode
  );
  const customSettingsRenderer = getUiNodeSettingsRenderer(id);

  return (
    <>
      <PanelHeader>Properties</PanelHeader>
      <ErrorBoundary fallbackRender={SettingsPanelErrorFallback}>
        <div className={classes.settingsPanel}>
          <div className={classes.currentElementAbout}>
            <PathBreadcrumb
              tree={tree}
              path={selectedPath}
              onSelect={setNodeSelection}
            />
          </div>
          <FormBuilder
            settings={namedArgs}
            settingsInfo={staticSettingsInfo}
            renderInputs={
              customSettingsRenderer
                ? (customSettingsRenderer as CustomFormRenderFn<
                    typeof namedArgs
                  >)
                : undefined
            }
            onSettingsChange={(name, action) => {
              switch (action.type) {
                case "UPDATE":
                  updateArgumentsByName(name, action.value);
                  return;

                case "REMOVE":
                  deleteArgumentByName(name);
                  return;
              }
            }}
          />
          <GoToSourceBtns node={currentNode} />
          <div className={classes.buttonsHolder}>
            {!isRootNode ? <DeleteNodeButton path={selectedPath} /> : null}
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}
const SettingsPanelErrorFallback = (fallbackProps: FallbackProps) => {
  return (
    <GeneralErrorView
      header="Error rendering settings panel"
      generateIssueLink={(state_at_error) =>
        generateGhIssueURL({
          title: "Error rendering settings panel",
          body: `Error rendering settings panel:\n${generateSerializedStateForError(
            state_at_error
          )}`,
          labels: ["Settings-Panel"],
        })
      }
      {...fallbackProps}
    />
  );
};
