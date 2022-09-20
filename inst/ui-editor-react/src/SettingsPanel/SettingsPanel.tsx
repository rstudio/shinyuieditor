import DeleteNodeButton from "components/DeleteNodeButton";
import { buildStaticFormInfo } from "components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import { FormBuilder } from "components/Inputs/SettingsFormBuilder/FormBuilder";
import type { FormValuesFromInfo } from "components/Inputs/SettingsFormBuilder/inputFieldTypes";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "Shiny-Ui-Elements/uiNodeTypes";

import PathBreadcrumb from "./PathBreadcrumb";
// import PathBreadcrumb from "./PathBreadcrumbLinear";
import classes from "./SettingsPanel.module.css";
import { useUpdateSettings } from "./useUpdateSettings";

export function SettingsPanel({ tree }: { tree: ShinyUiNode }) {
  const { currentNode, updateArgumentsByName, selectedPath, setNodeSelection } =
    useUpdateSettings(tree);

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
  const staticSettingsInfo = buildStaticFormInfo(
    shinyUiNodeInfo[uiName].settingsInfo,
    currentNode
  );

  return (
    <div className={classes.settingsPanel + " properties-panel"}>
      <div className={classes.currentElementAbout}>
        <PathBreadcrumb
          tree={tree}
          path={selectedPath}
          onSelect={setNodeSelection}
        />
      </div>
      <FormBuilder
        settings={uiArguments as FormValuesFromInfo<typeof staticSettingsInfo>}
        settingsInfo={staticSettingsInfo}
        onSettingsChange={(name, action) => {
          if (action.type === "UPDATE") {
            updateArgumentsByName({ name, value: action.value });
          } else {
            updateArgumentsByName({ name, value: undefined });
          }
        }}
      />
      <div className={classes.buttonsHolder}>
        {!isRootNode ? <DeleteNodeButton path={selectedPath} /> : null}
      </div>
    </div>
  );
}
