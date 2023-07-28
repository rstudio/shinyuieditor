import type { NodePath } from "ui-node-definitions/src/NodePath";
import { makeChildPath } from "ui-node-definitions/src/nodePathUtils";
import type { ShinyUiParentNode } from "ui-node-definitions/src/ShinyUiNode";
import { sum_booleans } from "util-functions/src/sum_booleans";

import UiNode from "../../../components/UiNode/UiNode";
import { DropWatcherPanel } from "../../../DragAndDropHelpers/DropWatcherPanel";
import { mergeClasses } from "../../../utils/mergeClasses";

import styles from "./CardUtils.module.css";

const possible_elements = new Set(["card_body", "card_header", "card_footer"]);

const headerScaffold = {
  id: "card_header",
  namedArgs: {},
} as const;
const bodyScaffold = {
  id: "card_body",
  namedArgs: {},
} as const;
const footerScaffold = {
  id: "card_footer",
  namedArgs: {},
} as const;

export function renderCardElements(
  children: ShinyUiParentNode["children"] = [],
  path: NodePath
): React.ReactNode {
  let header: JSX.Element | null = null;
  let body: JSX.Element | null = null;
  let footer: JSX.Element | null = null;

  let child_index = 0;

  children.forEach((child) => {
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
    if (id === "card_header") {
      header = child_node;
    } else if (id === "card_body") {
      body = child_node;
    } else if (id === "card_footer") {
      footer = child_node;
    }
  });

  const has_header = Boolean(header);
  const has_body = Boolean(body);

  return (
    <>
      {header ?? (
        <DropWatcherPanel
          className={mergeClasses(
            "card-header",
            styles.drop_watcher,
            styles.missing_card_element
          )}
          child_loc={0}
          parentPath={path}
          wrappingNode={headerScaffold}
          parentNodeType="card_header"
          messageOnHover="Add to card header"
          minHeightOnAvailable="20px"
        />
      )}
      {body ?? (
        <DropWatcherPanel
          className={mergeClasses(
            "card-body",
            styles.drop_watcher,
            styles.missing_card_element
          )}
          child_loc={sum_booleans(has_header)}
          parentPath={path}
          wrappingNode={bodyScaffold}
          visibleWhenEmpty={true}
          parentNodeType="card_body"
          messageOnHover="Add to card body"
        />
      )}
      {footer ?? (
        <DropWatcherPanel
          className={mergeClasses(
            styles.drop_watcher,
            "card-footer",
            styles.missing_card_element
          )}
          child_loc={sum_booleans(has_header, has_body)}
          parentPath={path}
          wrappingNode={footerScaffold}
          parentNodeType="card_footer"
          messageOnHover="Add to card footer"
          minHeightOnAvailable="20px"
        />
      )}
    </>
  );
}
