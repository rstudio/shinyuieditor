import { CardBody } from "../../components/cards/CardBody";
import { CardContainer } from "../../components/cards/CardContainer";
import { CardFooter } from "../../components/cards/CardFooter";
import { CardHeader } from "../../components/cards/CardHeader";
import UiNode from "../../components/UiNode/UiNode";
import { makeChildPath } from "../nodePathUtils";
import type {
  NodePath,
  ShinyUiChildren,
  UiNodeComponent,
} from "../uiNodeTypes";

import { MutedText } from "./MutedText";
import styles from "./style.module.css";

export type CardSettings = {};

const BslibCard: UiNodeComponent<CardSettings> = ({
  uiArguments,
  uiChildren = [],
  path,
  wrapperProps,
}) => {
  const { body_node, header_node, footer_node } = find_card_elements(
    uiChildren,
    path
  );
  return (
    <CardContainer
      className={styles.container}
      {...wrapperProps}
      body={body_node}
      header={header_node}
      footer={footer_node}
    ></CardContainer>
  );
};

export function find_card_elements(
  uiChildren: ShinyUiChildren,
  path: NodePath
) {
  let child_indices = 0;

  const body_child = uiChildren.find(
    ({ uiName }) => uiName === "bslib::card_body"
  );
  const body_node = body_child ? (
    <UiNode node={body_child} path={makeChildPath(path, child_indices++)} />
  ) : (
    <CardBody>
      <MutedText>I am an empty body</MutedText>
    </CardBody>
  );
  const header_child = uiChildren.find(
    ({ uiName }) => uiName === "bslib::card_header"
  );
  const header_node = header_child ? (
    <UiNode node={header_child} path={makeChildPath(path, child_indices++)} />
  ) : (
    <CardHeader>
      <MutedText>I am an empty header</MutedText>
    </CardHeader>
  );
  const footer_child = uiChildren.find(
    ({ uiName }) => uiName === "bslib::card_footer"
  );
  const footer_node = footer_child ? (
    <UiNode node={footer_child} path={makeChildPath(path, child_indices++)} />
  ) : (
    <CardFooter>
      <MutedText>I am an empty footer</MutedText>
    </CardFooter>
  );

  return { body_node, header_node, footer_node };
}

export default BslibCard;
