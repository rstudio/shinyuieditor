import DeleteNodeButton from "components/DeleteNodeButton";
import type { SettingsObjFromInfo } from "components/Inputs/SettingsFormBuilder/ArgumentInfo";
import { buildStaticSettingsInfo } from "components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import { SettingsFormBuilder } from "components/Inputs/SettingsFormBuilder/SettingsFormBuilder";
import { SettingsUpdateContext } from "components/Inputs/SettingsUpdateContext";
import type {
  SettingsUpdaterComponent,
  ShinyUiNode,
} from "Shiny-Ui-Elements/uiNodeTypes";
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

  const SettingsInputs = shinyUiNodeInfo[uiName]
    .SettingsComponent as SettingsUpdaterComponent<typeof uiArguments>;

  let settingsForm: JSX.Element;

  const settingsInfo = shinyUiNodeInfo[uiName].settingsInfo;
  if (settingsInfo) {
    const staticSettingsInfo = buildStaticSettingsInfo(
      settingsInfo,
      currentNode
    );
    settingsForm = (
      <SettingsFormBuilder
        settings={uiArguments as SettingsObjFromInfo<typeof staticSettingsInfo>}
        settingsInfo={staticSettingsInfo}
        onSettingsChange={(name, action) => {
          if (action.type === "UPDATE") {
            updateArgumentsByName({ name, value: action.value });
          } else {
            updateArgumentsByName({ name, value: undefined });
          }
        }}
      />
    );
  } else {
    settingsForm = (
      <form className={classes.settingsForm} onSubmit={stopDefaultSubmit}>
        <div className={classes.settingsInputs}>
          <SettingsUpdateContext onChange={updateArgumentsByName}>
            <SettingsInputs settings={uiArguments} node={currentNode} />
          </SettingsUpdateContext>
        </div>
      </form>
    );
  }

  return (
    <div className={classes.settingsPanel + " properties-panel"}>
      <div className={classes.currentElementAbout}>
        <PathBreadcrumb
          tree={tree}
          path={selectedPath}
          onSelect={setNodeSelection}
        />
      </div>
      {settingsForm}
      <div className={classes.buttonsHolder}>
        {!isRootNode ? <DeleteNodeButton path={selectedPath} /> : null}
      </div>
    </div>
  );
}

function stopDefaultSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
}
