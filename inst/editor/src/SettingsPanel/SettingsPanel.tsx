import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

import { GeneralErrorView } from "../components/ErrorCatcher/GeneralErrorView";
import { Trash } from "../components/Icons";
import Button from "../components/Inputs/Button/Button";
import { buildStaticFormInfo } from "../components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import type { CustomFormRenderFn } from "../components/Inputs/SettingsFormBuilder/FormBuilder";
import { FormBuilder } from "../components/Inputs/SettingsFormBuilder/FormBuilder";
import { PanelHeader } from "../EditorLayout/PanelHeader";
import { getUiNodeSettingsRenderer } from "../Shiny-Ui-Elements/registered_ui_nodes";
import type { ShinyUiNode } from "../ui-node-definitions/ShinyUiNode";
import { getUiNodeInfo } from "../ui-node-definitions/uiNodeTypes";
import {
  generateGhIssueURL,
  generateSerializedStateForError,
} from "../utils/generate_issue_reports";

import { GoToSourceBtns } from "./GoToSourceBtns";
import PathBreadcrumb from "./PathBreadcrumb";
// import PathBreadcrumb from "./PathBreadcrumbLinear";
import { useUpdateSettings } from "./useUpdateSettings";

export function SettingsPanel({ app_tree }: { app_tree: ShinyUiNode }) {
  const {
    currentNode,
    updateArgumentsByName,
    deleteArgumentByName,
    selectedPath,
    setNodeSelection,
    deleteNode,
  } = useUpdateSettings(app_tree);

  if (selectedPath === null) {
    return <div>Select an element to edit properties</div>;
  }
  const pathString = selectedPath.join(".");
  if (currentNode === null) {
    return <div>Error finding requested node at path {pathString}</div>;
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
        <div className="flex flex-col py-vertical-spacing px-horizontal-spacing h-100 overflow-auto">
          <div className="flex-shrink-0">
            <PathBreadcrumb
              tree={app_tree}
              path={selectedPath}
              onSelect={setNodeSelection}
            />
          </div>
          <FormBuilder
            app_tree={app_tree}
            settings={namedArgs}
            settingsInfo={staticSettingsInfo}
            renderInputs={
              customSettingsRenderer
                ? (customSettingsRenderer as CustomFormRenderFn<
                    typeof namedArgs
                  >)
                : undefined
            }
            node={currentNode}
            nodePath={selectedPath}
            // We use a key here because otherwise react will try and be clever with
            // the inputs which can cause funky things when we switch between nodes
            // with shared argument names. If react doesn't know to rerender then the
            // value of the previous node's shared argument will be used in place of
            // the new nodes value. Putting the key all the way up
            key={pathString + id}
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
          <div className="mt-auto py-vertical-spacing flex flex-col justify-around items-center gap-vertical-spacing">
            {!isRootNode && (
              <Button
                className="text-danger flex items-center justify-start h-[40px] w-100 border-0"
                onClick={(e) => {
                  // Stop propigation of click event in case we have other click listeners
                  // that try and do things like set selection
                  e.stopPropagation();
                  deleteNode();
                }}
                aria-label="Delete Selected Node"
                title="Delete Selected Node"
                variant="delete"
                type="button"
              >
                <Trash className="text-2xl" />
                Delete Element
              </Button>
            )}
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
