import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";
import {
  FiSettings as SettingsIcon,
  FiTrash as TrashIcon,
} from "react-icons/fi";
import {
  uiComponentAndSettings,
  UiNodeComponent,
} from "../Elements/uiComponentAndSettings";
import {
  checkIfContainerNode,
  NodePath,
  ShinyUiArguments,
  ShinyUiNameAndArguments,
  UiNodeProps,
} from "../uiNodeTypes";
import { NodeUpdateContext } from "../UiTree";
import classes from "./styles.module.css";
import { UiSettingsComponent } from "./UiSettingsComponent";
import { useDragAndDropElements } from "./useDragAndDropElements";

/**
 * Recursively render the nodes in a UI Tree
 */
export function UiNode({
  path = [],
  ...props
}: { path?: NodePath } & UiNodeProps) {
  const nodeUpdaters = React.useContext(NodeUpdateContext);

  const [isOpen, setIsOpen] = React.useState(false);

  const controls = (
    <>
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(!isOpen)}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <span className={classes.editButton}>
            <SettingsIcon />
          </span>
        </PopoverTrigger>
        <PopoverContent aria-label={`Settings panel`}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Settings</PopoverHeader>
          <PopoverBody>
            <UiSettingsComponent
              {...props}
              onChange={(newSettings) => {
                nodeUpdaters.updateNode(path, {
                  ...props,
                  uiArguments: newSettings,
                } as UiNodeProps);
                setIsOpen(false);
              }}
              checkValid={false}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <span
        className={classes.deleteButton}
        onClick={() => {
          nodeUpdaters.deleteNode(path);
        }}
      >
        <TrashIcon />
      </span>
    </>
  );

  return (
    <UiNodeWrapper path={path} {...props}>
      {controls}
    </UiNodeWrapper>
  );
}

/**
 * Generate the overall wrapping div of the node. Sets the proper classes for
 * styling and adds the drag-and-drop callbacks to the appropriate (container)
 * nodes.
 */
function UiNodeWrapper({
  path,
  children: settingsPopover,
  ...props
}: { path: NodePath; children: React.ReactNode } & ShinyUiNameAndArguments) {
  const { uiName, uiArguments, uiChildren } = props;
  const dragAndDropCallbacks = useDragAndDropElements(
    path,
    !checkIfContainerNode(props)
  );
  const Comp = uiComponentAndSettings[uiName].UiComponent as UiNodeComponent<
    ShinyUiArguments[typeof uiName]
  >;

  const placementStyles =
    props.uiName === "gridlayout::grid_panel"
      ? { gridArea: props.uiArguments.area }
      : {};

  return (
    <Comp uiArguments={uiArguments}>
      {uiChildren?.map((childNode, i) => (
        <UiNode key={path.join(".") + i} path={[...path, i]} {...childNode} />
      ))}
      {settingsPopover}
    </Comp>
  );
}

export default UiNode;
