import { sum_booleans } from "util-functions/src/sum_booleans";

import UiNode from "../../../components/UiNode/UiNode";
import { DropWatcherPanel } from "../../../DragAndDropHelpers/DropWatcherPanel";
import { makeChildPath } from "../../nodePathUtils";
import type { NodePath, ShinyUiParentNode } from "../../uiNodeTypes";

import { CardBodyFill, CardFooter, CardHeader } from "./CardElements";
import styles from "./CardUtils.module.css";

const possible_elements = new Set([
  "bslib::card_body_fill",
  "bslib::card_header",
  "bslib::card_footer",
]);

const headerScaffold = {
  id: "bslib::card_header",
  namedArgs: {},
} as const;
const bodyScaffold = {
  id: "bslib::card_body_fill",
  namedArgs: {},
} as const;
const footerScaffold = {
  id: "bslib::card_footer",
  namedArgs: {},
} as const;

export function render_card_elements(
  uiChildren: ShinyUiParentNode["uiChildren"] = [],
  path: NodePath
): React.ReactNode {
  let header: JSX.Element | null = null;
  let body: JSX.Element | null = null;
  let footer: JSX.Element | null = null;

  let child_index = 0;

  uiChildren.forEach((child) => {
    const { id } = child;
    if (!possible_elements.has(id)) {
      // eslint-disable-next-line no-console
      console.warn("Unknown child of a grid card seen. Ignoring", child);
      return;
    }
    const child_node = (
      <UiNode
        node={child}
        path={makeChildPath(path, child_index)}
        canDrag={false}
      />
    );
    child_index++;
    if (id === "bslib::card_header") {
      header = child_node;
    } else if (id === "bslib::card_body_fill") {
      body = child_node;
    } else if (id === "bslib::card_footer") {
      footer = child_node;
    }
  });

  const has_header = Boolean(header);
  const has_body = Boolean(body);

  return (
    <>
      {header ?? (
        <CardHeader className={styles.missing_card_element}>
          <DropWatcherPanel
            className={styles.drop_watcher}
            child_loc={0}
            parentPath={path}
            wrappingNode={headerScaffold}
            parentNodeType="bslib::card_header"
            messageOnHover="Add to card header"
          />
        </CardHeader>
      )}
      {body ?? (
        <CardBodyFill className={styles.missing_card_element}>
          <DropWatcherPanel
            className={styles.drop_watcher}
            child_loc={sum_booleans(has_header)}
            parentPath={path}
            wrappingNode={bodyScaffold}
            parentNodeType="bslib::card_body_fill"
            messageOnHover="Add to card body"
          />
        </CardBodyFill>
      )}
      {footer ?? (
        <CardFooter className={styles.missing_card_element}>
          <DropWatcherPanel
            className={styles.drop_watcher}
            child_loc={sum_booleans(has_header, has_body)}
            parentPath={path}
            wrappingNode={footerScaffold}
            parentNodeType="bslib::card_footer"
            messageOnHover="Add to card footer"
          />
        </CardFooter>
      )}
    </>
  );
}
