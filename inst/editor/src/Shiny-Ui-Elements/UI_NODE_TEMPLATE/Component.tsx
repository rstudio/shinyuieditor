import { pathToString } from "../nodePathUtils";
import type { UiNodeComponent } from "../uiNodeTypes";

import type { NodeNameSettings } from "./index";

import styles from "./styles.module.css";

export const PkgNodeName: UiNodeComponent<
  NodeNameSettings,
  { TakesChildren: true }
> = ({ uiArguments, uiChildren, path, wrapperProps }) => {
  return (
    <div className={styles.container} {...wrapperProps}>
      <p>NODE NAME: {uiArguments.name}</p>
      <p>Path: {pathToString(path)}</p>
      <p>There are {uiChildren?.length ?? 0} children</p>
    </div>
  );
};
