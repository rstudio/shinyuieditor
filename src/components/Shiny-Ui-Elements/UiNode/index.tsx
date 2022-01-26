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
import { UiComponent } from "../UiElement/UiComponent";
import { UiSettingsComponent } from "../UiElement/UiSettingsComponent";
import { NodeUpdateContext } from "../UiTree";
import {
  checkIfContainerNode,
  ContainerSettings,
  NodePath,
  UiLeafNode,
  UiNodeProps,
} from "./nodeTypes";
import classes from "./styles.module.css";
import { useDragAndDropElements } from "./useDragAndDropElements";

export function UiNode({
  path = [],
  ...props
}: { path?: NodePath } & UiNodeProps) {
  const isContainerNode = checkIfContainerNode(props);
  const isLeafNode = !isContainerNode;
  const pathString = path.join("-");

  const nodeUpdaters = React.useContext(NodeUpdateContext);
  const dragAndDropCallbacks = useDragAndDropElements(path, isLeafNode);

  const [isOpen, setIsOpen] = React.useState(false);

  let body: JSX.Element;

  if (!isLeafNode) {
    body = (
      <>
        {props.uiChildren
          ? props.uiChildren.map((childNode, i) => (
              <UiNode key={pathString + i} path={[...path, i]} {...childNode} />
            ))
          : null}
      </>
    );
  } else if ("uiInfo" in props && props.uiInfo) {
    body = <UiComponent {...props.uiInfo} />;
  } else {
    body = <span> Un-defined leaf node</span>;
  }

  return (
    <div
      id={pathString}
      className={isLeafNode ? classes.leaf : classes.container}
      style={makeContainerStyles(
        "uiChildren" in props ? props.containerSettings : null
      )}
      {...dragAndDropCallbacks}
    >
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
            {isLeafNode && props.uiInfo ? (
              <UiSettingsComponent
                {...props.uiInfo}
                onChange={(newSettings) => {
                  console.log(
                    `New settings for node at ${pathString}`,
                    newSettings
                  );
                  const newNode = {
                    uiName: props.uiInfo.uiName,
                    uiArguments: newSettings,
                  };
                  nodeUpdaters.updateNode(path, {
                    uiInfo: newNode,
                  } as UiLeafNode);
                  setIsOpen(false);
                }}
                checkValid={false}
              />
            ) : (
              <div>
                <h3>Container node settings</h3>
                <span>Current settings: {JSON.stringify(props)}</span>
              </div>
            )}
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
      {body}
    </div>
  );
}

const dirToFlexProp = {
  center: "center",
  left: "start",
  top: "start",
  right: "end",
  bottom: "end",
};

function makeContainerStyles(
  containerSettings: ContainerSettings | null | undefined
) {
  return (
    containerSettings
      ? {
          "--verticalAlign": dirToFlexProp[containerSettings.verticalAlign],
          "--horizontalAlign": dirToFlexProp[containerSettings.horizontalAlign],
        }
      : {}
  ) as React.CSSProperties;
}

export default UiNode;
