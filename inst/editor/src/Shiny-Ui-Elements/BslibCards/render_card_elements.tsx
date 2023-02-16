import { CardBody } from "../../components/cards/CardBody";
import { CardFooter } from "../../components/cards/CardFooter";
import { CardHeader } from "../../components/cards/CardHeader";
import UiNode from "../../components/UiNode/UiNode";
import { DropWatcherPanel } from "../../DragAndDropHelpers/DropWatcherPanel";
import { usePlaceNode } from "../../state/app_info";
import { makeChildPath } from "../nodePathUtils";
import type { NodePath, ShinyUiChildren, ShinyUiNode } from "../uiNodeTypes";

import { MutedText } from "./MutedText";
import { wrapInNode } from "./wrapInNode";

const possible_elements = new Set([
  "bslib::card_body",
  "bslib::card_header",
  "bslib::card_footer",
]);

const headerScaffold = {
  uiName: "bslib::card_header",
  uiArguments: {},
} as const;
const bodyScaffold = { uiName: "bslib::card_body", uiArguments: {} } as const;
const footerScaffold = {
  uiName: "bslib::card_footer",
  uiArguments: {},
} as const;

export function render_card_elements(
  uiChildren: ShinyUiChildren,
  path: NodePath
): React.ReactNode {
  let header: JSX.Element | null = null;
  let body: JSX.Element | null = null;
  let footer: JSX.Element | null = null;

  let child_index = 0;
  // const elements: JSX.Element[] = [];
  uiChildren.forEach((child) => {
    const { uiName } = child;
    if (!possible_elements.has(uiName)) {
      // eslint-disable-next-line no-console
      console.warn("Unknown child of a grid card seen. Ignoring", child);
      return;
    }
    const child_node = (
      <UiNode node={child} path={makeChildPath(path, child_index)} />
    );
    child_index++;
    if (uiName === "bslib::card_header") {
      header = child_node;
    } else if (uiName === "bslib::card_body") {
      body = child_node;
    } else if (uiName === "bslib::card_footer") {
      footer = child_node;
    }
  });

  return (
    <>
      {header ?? (
        <CardHeader>
          <WrappedDropWatcher
            index={child_index++}
            parentPath={path}
            wrappingNode={headerScaffold}
          >
            <MutedText>Add card header</MutedText>
          </WrappedDropWatcher>
        </CardHeader>
      )}
      {body ?? (
        <CardBody>
          <WrappedDropWatcher
            index={child_index++}
            parentPath={path}
            wrappingNode={bodyScaffold}
          >
            <MutedText>Add card body</MutedText>
          </WrappedDropWatcher>
        </CardBody>
      )}
      {footer ?? (
        <CardFooter>
          <WrappedDropWatcher
            index={child_index++}
            parentPath={path}
            wrappingNode={footerScaffold}
          >
            <MutedText>Add card footer</MutedText>
          </WrappedDropWatcher>
        </CardFooter>
      )}
    </>
  );
}

function WrappedDropWatcher({
  index,
  parentPath,
  wrappingNode,
  children,
}: {
  index: number;
  parentPath: NodePath;
  wrappingNode: Pick<ShinyUiNode, "uiName" | "uiArguments">;
  children: React.ReactNode;
}) {
  const place_node = usePlaceNode();

  return (
    <DropWatcherPanel
      index={index}
      parentPath={parentPath}
      dropHandlerArgs={{
        onDrop: ({ node, currentPath }) => {
          place_node({
            node: wrapInNode({
              child: node,
              parent: wrappingNode,
            }),
            currentPath,
            path: makeChildPath(parentPath, index),
          });
        },
      }}
    >
      {children}
    </DropWatcherPanel>
  );
}
