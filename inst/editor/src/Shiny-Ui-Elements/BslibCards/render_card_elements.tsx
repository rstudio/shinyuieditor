import { CardBody } from "../../components/cards/CardBody";
import { CardFooter } from "../../components/cards/CardFooter";
import { CardHeader } from "../../components/cards/CardHeader";
import UiNode from "../../components/UiNode/UiNode";
import { makeChildPath } from "../nodePathUtils";
import type { NodePath, ShinyUiChildren } from "../uiNodeTypes";

import { MutedText } from "./MutedText";

export function render_card_elements(
  uiChildren: ShinyUiChildren,
  path: NodePath
): React.ReactNode {
  let header: JSX.Element | null = null;
  let body: JSX.Element | null = null;
  let footer: JSX.Element | null = null;

  // const elements: JSX.Element[] = [];
  uiChildren.forEach((child, i) => {
    const { uiName } = child;
    if (!possible_elements.has(uiName)) {
      // eslint-disable-next-line no-console
      console.warn("Unknown child of a grid card seen. Ignoring", child);
      return;
    }
    const child_node = <UiNode node={child} path={makeChildPath(path, i)} />;

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
          <MutedText>I am an empty header</MutedText>
        </CardHeader>
      )}
      {body ?? (
        <CardBody>
          <MutedText>I am an empty body</MutedText>
        </CardBody>
      )}
      {footer ?? (
        <CardFooter>
          <MutedText>I am an empty footer</MutedText>
        </CardFooter>
      )}
    </>
  );
}
const possible_elements = new Set([
  "bslib::card_body",
  "bslib::card_header",
  "bslib::card_footer",
]);
