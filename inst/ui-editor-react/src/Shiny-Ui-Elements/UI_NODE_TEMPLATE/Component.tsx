import { pathToString } from "Shiny-Ui-Elements/nodePathUtils";
import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { NodeNameSettings } from "./index";

import classes from "./styles.module.css";

const PkgNodeName: UiNodeComponent<NodeNameSettings> = ({
  uiArguments,
  uiChildren,
  path,
  wrapperProps,
}) => {
  return (
    <div className={classes.container} {...wrapperProps}>
      <p>NODE NAME: {uiArguments.name}</p>
      <p>Path: {pathToString(path)}</p>
      <p>There are {uiChildren?.length ?? 0} children</p>
    </div>
  );
};

export default PkgNodeName;
