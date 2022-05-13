import DeleteNodeButton from "components/DeleteNodeButton";
import Button from "components/Inputs/Button";
import { SettingsUpdateContext } from "components/Inputs/SettingsUpdateContext";
import type {
  SettingsUpdaterComponent,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { BiCheck } from "react-icons/bi";

import PathBreadcrumb from "./PathBreadcrumb";
import classes from "./SettingsPanel.module.css";
import { useUpdateSettings } from "./useUpdateSettings";

export function SettingsPanel({ tree }: { tree: ShinyUiNode }) {
  const {
    currentNode,
    errorMsg,
    handleSubmit,
    updateArgumentsByName,
    selectedPath,
    setNodeSelection,
  } = useUpdateSettings({ tree, validateSettings: false });

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

  return (
    <div className={classes.settingsPanel + " properties-panel"}>
      <div className={classes.currentElementAbout}>
        <PathBreadcrumb
          tree={tree}
          path={selectedPath}
          onSelect={setNodeSelection}
        />
      </div>
      <form className={classes.settingsForm} onSubmit={handleSubmit}>
        <div className={classes.settingsInputs}>
          <SettingsUpdateContext onChange={updateArgumentsByName}>
            <SettingsInputs settings={uiArguments} />
          </SettingsUpdateContext>
          {errorMsg ? (
            <div>
              Input settings are not valid. The following errors were received:
              <div className={classes.validationErrorMsg}>{errorMsg}</div>
            </div>
          ) : null}
        </div>
        <div className={classes.buttonsHolder}>
          {uiName !== "unknownUiFunction" ? (
            <Button
              type="submit"
              aria-label="Submit new settings"
              title="Update Element"
            >
              <BiCheck /> Update
            </Button>
          ) : null}
          {!isRootNode ? <DeleteNodeButton path={selectedPath} /> : null}
        </div>
      </form>
    </div>
  );
}
