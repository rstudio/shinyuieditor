import DeleteNodeButton from "../components/DeleteNodeButton";
import { buildStaticFormInfo } from "../components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import type { CustomFormRenderFn } from "../components/Inputs/SettingsFormBuilder/FormBuilder";
import { FormBuilder } from "../components/Inputs/SettingsFormBuilder/FormBuilder";
import type { DynamicInputOptions } from "../components/Inputs/SettingsFormBuilder/inputFieldTypes";
import { PanelHeader } from "../EditorSkeleton/EditorSkeleton";
import type { ShinyUiNode } from "../main";
import { shinyUiNodeInfo } from "../Shiny-Ui-Elements/uiNodeTypes";

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

  const { uiName, uiArguments } = currentNode;

  // If performance issues happen this can be memoized
  const nodeInfo = shinyUiNodeInfo[uiName];
  const staticSettingsInfo = buildStaticFormInfo(
    nodeInfo.settingsInfo as Record<string, DynamicInputOptions>,
    currentNode
  );

  return (
    <>
      <PanelHeader>Properties</PanelHeader>
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
            nodeInfo.settingsFormRender as CustomFormRenderFn<
              typeof uiArguments
            >
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
    </>
  );
}
