import React from "react";

import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

import DeleteNodeButton from "../components/DeleteNodeButton";
import { GeneralErrorView } from "../components/ErrorCatcher/GeneralErrorView";
import { buildStaticFormInfo } from "../components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import type { CustomFormRenderFn } from "../components/Inputs/SettingsFormBuilder/FormBuilder";
import { FormBuilder } from "../components/Inputs/SettingsFormBuilder/FormBuilder";
import { PanelHeader } from "../EditorLayout/PanelHeader";
import type { ShinyUiNode } from "../main";
import { getUiNodeInfo } from "../Shiny-Ui-Elements/uiNodeTypes";
import {
  generate_gh_issue_url,
  generate_serialized_state_for_error,
} from "../utils/generate_issue_reports";

import { GoToSourceBtns } from "./GoToSourceBtns";
import PathBreadcrumb from "./PathBreadcrumb";
// import PathBreadcrumb from "./PathBreadcrumbLinear";
import classes from "./SettingsPanel.module.css";
import { useUpdateSettings } from "./useUpdateSettings";

type SettingsPanelProps = {
  tree: ShinyUiNode;
};

export function SettingsPanel({ tree }: SettingsPanelProps) {
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

  const { uiName, uiArguments } = currentNode;

  // If performance issues happen this can be memoized
  const nodeInfo = getUiNodeInfo(uiName);
  const staticSettingsInfo = buildStaticFormInfo(
    nodeInfo.settingsInfo,
    currentNode
  );

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
            settings={uiArguments}
            settingsInfo={staticSettingsInfo}
            renderInputs={
              "settingsFormRender" in nodeInfo
                ? (nodeInfo.settingsFormRender as CustomFormRenderFn<
                    typeof uiArguments
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
        generate_gh_issue_url({
          title: "Error rendering settings panel",
          body: `Error rendering settings panel:\n${generate_serialized_state_for_error(
            state_at_error
          )}`,
          labels: ["Settings-Panel"],
        })
      }
      {...fallbackProps}
    />
  );
};
