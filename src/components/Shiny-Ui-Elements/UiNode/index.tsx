import { ShinyUiNameAndArguments } from "../Elements/componentTypes";
import { UiComponent } from "../UiPanel/UiComponent";
import classes from "./styles.module.css";

type UiContainerNode = {
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
  uiInfo?: ShinyUiNameAndArguments;
};

type NodeLocation = {
  // Unique ID of this node (for use locating within tree)
  path?: number[];
};

type UiNodeProps = UiContainerNode | UiLeafNode;

function UiNode({ path = [0], ...props }: NodeLocation & UiNodeProps) {
  const pathString = path.join("-");

  let body: JSX.Element;

  if ("uiChildren" in props) {
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
    const { uiInfo } = props;
    body = <UiComponent {...uiInfo} />;
  } else {
    body = <span> Un-defined leaf node</span>;
  }

  return (
    <div
      id={pathString}
      className={classes.container}
      style={makeContainerStyles(
        "uiChildren" in props ? props.containerSettings : null
      )}
    >
      <span
        className={classes.pathLabel}
        onClick={() => {
          console.log(
            `user has clicked on the node at position ${pathString} to make an edit`
          );
        }}
      >
        {pathString}
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
