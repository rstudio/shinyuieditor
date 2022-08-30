import React from "react";

import { samePath } from "components/UiNode/TreeManipulation/samePath";
import { useNodeSelectionState } from "NodeSelectionState";
import { makeChildPath } from "Shiny-Ui-Elements/nodePathUtils";
import type { NodePath } from "Shiny-Ui-Elements/uiNodeTypes";

import classes from "./Tabset.module.css";

type TabProps = {
  name: string;
  isActive: boolean;
  parentPath: NodePath;
  index: number;
};

export const Tab = ({ name, isActive, index, parentPath }: TabProps) => {
  const pathToTabPanel = makeChildPath(parentPath, index);
  const [selectedPath, setSelectedPath] = useNodeSelectionState();

  const handleSelect: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback(
      (e) => {
        e.stopPropagation();
        setSelectedPath(pathToTabPanel);
      },
      [pathToTabPanel, setSelectedPath]
    );

  const isSelected = samePath(pathToTabPanel, selectedPath);

  return (
    <div
      className={classes.tab}
      data-active-tab={isActive}
      data-selected-tab={isSelected}
      onClick={handleSelect}
      aria-label={isActive ? `Active tab ${name}` : `Select ${name} tab`}
    >
      {name}
    </div>
  );
};
