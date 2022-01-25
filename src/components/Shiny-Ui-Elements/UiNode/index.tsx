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
import { NodeUpdateContext } from "../UiTree";
import classes from "./styles.module.css";

export type UiContainerNode = {
  // Any children of this node
  uiChildren: UiNodeProps[];

  // Settings for the container div
  containerSettings?: ContainerSettings;
};

type ContainerSettings = {
  horizontalAlign: "left" | "center" | "right";
  verticalAlign: "top" | "center" | "bottom";
};

type UiLeafNode = {
  // Name and properties of the UI function used for this node
  uiInfo: ShinyUiNameAndArguments;
};

// Path to a given node. Starts at [0] for the root. The first child for
// instance would be then [0,1]
export type NodePath = number[];

type NodeLocation = {
  // Unique ID of this node (for use locating within tree)
  path?: NodePath;
};

export type UiNodeProps = UiContainerNode | UiLeafNode;

export function isContainerNode(node: UiNodeProps): node is UiContainerNode {
  return (node as UiContainerNode).uiChildren !== undefined;
}

function highlightDropability(e: React.DragEvent<HTMLDivElement>) {
  if (e.currentTarget === e.target) {
    e.currentTarget.classList.add(classes.canDrop);
  }
}

function removeHighlight(e: React.DragEvent<HTMLDivElement>) {
  e.currentTarget.classList.remove(classes.canDrop);
}

export function UiNode({ path = [], ...props }: NodeLocation & UiNodeProps) {
  const isLeafNode = !isContainerNode(props);
  const pathString = path.join("-");

  const nodeUpdaters = React.useContext(NodeUpdateContext);

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
      onDragOver={(e) => {
        e.preventDefault();
        if (isLeafNode) return;

        highlightDropability(e);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        if (isLeafNode) return;
        removeHighlight(e);
      }}
      onDrop={(e) => {
        const droppedUi = e.dataTransfer.getData("element-type");
        console.log(`Element of the type ${droppedUi} was dropped`);
        removeHighlight(e);
      }}
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
