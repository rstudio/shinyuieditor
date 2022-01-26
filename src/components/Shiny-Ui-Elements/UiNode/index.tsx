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
import { ShinyUiNameAndArguments } from "../Elements/componentTypes";
import { UiComponent } from "../UiElement/UiComponent";
import { UiSettingsComponent } from "../UiElement/UiSettingsComponent";
import { NodeUpdateContext, NodeUpdaters } from "../UiTree";
import { checkIfContainerNode, NodePath, UiNodeProps } from "./nodeTypes";
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
  const dragAndDropCallbacks = useDragAndDropElements(
    path,
    !checkIfContainerNode(props)
  );

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <NodeWrapper dragAndDropCallbacks={dragAndDropCallbacks} {...props}>
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
              updateNode={nodeUpdaters.updateNode}
              close={() => setIsOpen(false)}
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
      <NodeBody path={path} {...props} />
    </NodeWrapper>
  );
}

/**
 * Generate the contents of the settings panel popover
 */
function SettingsBody({
  path,
  updateNode,
  close,
  ...props
}: {
  path: NodePath;
  updateNode: NodeUpdaters["updateNode"];
  close: () => void;
} & UiNodeProps) {
  if (checkIfContainerNode(props)) {
    return (
      <div>
        <h3>Container node settings</h3>
        <span>Current settings: {JSON.stringify(props)}</span>
      </div>
    );
  }
  return (
    <UiSettingsComponent
      {...props}
      onChange={(newSettings) => {
        updateNode(path, {
          uiName: props.uiName,
          uiArguments: newSettings,
        } as ShinyUiNameAndArguments);
        close();
      }}
      checkValid={false}
    />
  );
}

/**
 * Generate the main body of the UI Node that is wrapped in the popover. This is
 * the rendered children in the case of the container or the content in the case
 * of leaf nodes.
 */
function NodeBody({ path, ...props }: { path: NodePath } & UiNodeProps) {
  if (checkIfContainerNode(props)) {
    return (
      <>
        {props.uiChildren.map((childNode, i) => (
          <UiNode key={path.join(".") + i} path={[...path, i]} {...childNode} />
        ))}
      </>
    );
  }

  return <UiComponent {...props} />;
}

/**
 * Generate the overall wrapping div of the node. Sets the proper classes for
 * styling and adds the drag-and-drop callbacks to the appropriate (container)
 * nodes.
 */
function NodeWrapper({
  dragAndDropCallbacks,
  children,
  ...props
}: {
  dragAndDropCallbacks: ReturnType<typeof useDragAndDropElements>;
  children: React.ReactNode;
} & UiNodeProps) {
  if (checkIfContainerNode(props)) {
    const containerSettings = props.uiArguments;
    return (
      <div
        className={classes.container}
        style={
          {
            "--verticalAlign": dirToFlexProp[containerSettings.verticalAlign],
            "--horizontalAlign":
              dirToFlexProp[containerSettings.horizontalAlign],
          } as React.CSSProperties
        }
        {...dragAndDropCallbacks}
      >
        {children}
      </div>
    );
  }

  return <div className={classes.leaf}>{children}</div>;
}

const dirToFlexProp = {
  center: "center",
  left: "start",
  top: "start",
  right: "end",
  bottom: "end",
};

export default UiNode;
