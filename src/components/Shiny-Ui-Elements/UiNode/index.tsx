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
import { checkIfContainerNode, NodePath, UiNodeProps } from "../uiNodeTypes";
import NodeUpdateContext from "./NodeUpdateContext";
import classes from "./styles.module.css";
import { UiSettingsComponent } from "./UiSettingsComponent";
import { useDragAndDropElements } from "./useDragAndDropElements";

/**
 * Recursively render the nodes in a UI Tree
 */

const UiNode = ({ path = [], ...props }: { path?: NodePath } & UiNodeProps) => {
  const nodeUpdaters = React.useContext(NodeUpdateContext);

  const [isOpen, setIsOpen] = React.useState(false);
  const settingsButtonRef = React.useRef<HTMLSpanElement>(null);
  const deleteButtonRef = React.useRef<HTMLSpanElement>(null);

  const controls = (
    <>
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(!isOpen)}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <span
            className={classes.editButton}
            style={{ position: "absolute" }}
            ref={settingsButtonRef}
          >
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
        style={{ position: "absolute" }}
        className={classes.deleteButton}
        onClick={() => {
          nodeUpdaters.deleteNode(path);
        }}
        ref={deleteButtonRef}
      >
        <TrashIcon />
      </span>
    </>
  );

  const { uiName, uiArguments, uiChildren } = props;
  const dragAndDropCallbacks = useDragAndDropElements(
    path,
    !checkIfContainerNode(props)
  );
  const Comp = uiComponentAndSettings[uiName].UiComponent as UiNodeComponent<
    typeof uiArguments
  >;

  const handleHoverOver = (e: React.MouseEvent) => {
    e.stopPropagation();
    settingsButtonRef.current?.classList.add(classes.selected);
    deleteButtonRef.current?.classList.add(classes.selected);
  };
  const handleHoverOff = (e: React.MouseEvent) => {
    e.stopPropagation();
    settingsButtonRef.current?.classList.remove(classes.selected);
    deleteButtonRef.current?.classList.remove(classes.selected);
  };

  return (
    <Comp
      uiArguments={uiArguments}
      {...dragAndDropCallbacks}
      onMouseOver={handleHoverOver}
      onMouseLeave={handleHoverOff}
    >
      {uiChildren?.map((childNode, i) => (
        <UiNode key={path.join(".") + i} path={[...path, i]} {...childNode} />
      ))}
      {controls}
    </Comp>
  );
};

export default UiNode;
