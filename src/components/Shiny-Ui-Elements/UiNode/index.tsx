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
import GridlayoutGridPanel from "../Elements/GridlayoutGridPanel";
import { uiComponentAndSettings } from "../Elements/uiComponentAndSettings";
import { UiSettingsComponent } from "./UiSettingsComponent";
import {
  checkIfContainerNode,
  NodePath,
  ShinyUiArguments,
  ShinyUiNameAndArguments,
  UiContainerNode,
  UiNodeProps,
} from "../uiNodeTypes";
import { NodeUpdateContext } from "../UiTree";
import { ContainerSettingsForm } from "./ContainerSettingsForm";
import classes from "./styles.module.css";
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
            <SettingsBody
              path={path}
              onChange={(newSettings) => {
                nodeUpdaters.updateNode(path, {
                  ...props,
                  uiArguments: newSettings,
                } as UiNodeProps);
                setIsOpen(false);
              }}
              {...props}
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

  if (checkIfContainerNode(props)) {
    return (
      <ContainerNodeWrapper path={path} {...props}>
        {controls}
      </ContainerNodeWrapper>
    );
  }
  return (
    <LeafNodeWrapper path={path} {...props}>
      {controls}
    </LeafNodeWrapper>
  );
}

/**
 * Generate the contents of the settings panel popover
 */
function SettingsBody({
  path,
  onChange,
  ...props
}: {
  path: NodePath;
  onChange: (newSettings: object) => void;
} & UiNodeProps) {
  if (checkIfContainerNode(props)) {
    return (
      <ContainerSettingsForm settings={props.uiArguments} onChange={onChange} />
    );
  }
  return (
    <UiSettingsComponent {...props} onChange={onChange} checkValid={false} />
  );
}

type LeafNodeProps = ShinyUiNameAndArguments;
/**
 * Generate the overall wrapping div of the node. Sets the proper classes for
 * styling and adds the drag-and-drop callbacks to the appropriate (container)
 * nodes.
 */
function LeafNodeWrapper({
  path,
  children: settingsPopover,
  ...props
}: { path: NodePath; children: React.ReactNode } & LeafNodeProps) {
  const { uiName, uiArguments } = props;
  const Comp = uiComponentAndSettings[uiName].UiComponent as (
    p: ShinyUiArguments[typeof uiName]
  ) => JSX.Element;

  return (
    <div className={classes.leaf}>
      {settingsPopover}
      <Comp {...uiArguments} />
    </div>
  );
}

/**
 * Generate the main body of a container UI Node that is wrapped in the popover.
 */
function ContainerNodeWrapper({
  path,
  children,
  ...props
}: { path: NodePath; children: React.ReactNode } & UiContainerNode) {
  const dragAndDropCallbacks = useDragAndDropElements(
    path,
    !checkIfContainerNode(props)
  );

  const ContainerComponent = GridlayoutGridPanel;
  const containerSettings = props.uiArguments;
  return (
    <ContainerComponent settings={containerSettings} {...dragAndDropCallbacks}>
      {children}
      <>
        {props.uiChildren.map((childNode, i) => (
          <UiNode key={path.join(".") + i} path={[...path, i]} {...childNode} />
        ))}
      </>
    </ContainerComponent>
  );
}

export default UiNode;
