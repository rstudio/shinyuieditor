import { CardBody } from "../../components/cards/CardBody";
import { CardFooter } from "../../components/cards/CardFooter";
import { CardHeader } from "../../components/cards/CardHeader";
import UiNode from "../../components/UiNode/UiNode";
import { DropWatcherPanel } from "../../DragAndDropHelpers/DropWatcherPanel";
import { makeChildPath } from "../nodePathUtils";
import type { NodePath, ShinyUiChildren } from "../uiNodeTypes";

import { MutedText } from "./MutedText";

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
      <UiNode
        node={child}
        path={makeChildPath(path, child_index)}
        canDrag={false}
      />
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
          <DropWatcherPanel
            index={child_index++}
            parentPath={path}
            wrappingNode={headerScaffold}
          >
            <MutedText>Add card header</MutedText>
          </DropWatcherPanel>
        </CardHeader>
      )}
      {body ?? (
        <CardBody>
          <DropWatcherPanel
            index={child_index++}
            parentPath={path}
            wrappingNode={bodyScaffold}
          >
            <MutedText>Add card body</MutedText>
          </DropWatcherPanel>
        </CardBody>
      )}
      {footer ?? (
        <CardFooter>
          <DropWatcherPanel
            index={child_index++}
            parentPath={path}
            wrappingNode={footerScaffold}
          >
            <MutedText>Add card footer</MutedText>
          </DropWatcherPanel>
        </CardFooter>
      )}
    </>
  );
}
