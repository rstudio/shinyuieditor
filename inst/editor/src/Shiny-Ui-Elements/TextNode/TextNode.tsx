import type {
  TextNodeSettings,
  Text_Node_Tag,
} from "../../ast_parsing/text_nodes/build_text_node";
import { valid_text_node_tags } from "../../ast_parsing/text_nodes/build_text_node";
import type { UiLeafNodeComponent } from "../uiNodeTypes";

import styles from "./styles.module.css";

export const TextNode: UiLeafNodeComponent<TextNodeSettings> = ({
  uiArguments: { contents, decoration, size = "span" },
  wrapperProps,
}) => {
  const WrapperComp: Text_Node_Tag = valid_text_node_tags.includes(
    size as Text_Node_Tag
  )
    ? (size as Text_Node_Tag)
    : "span";
  return (
    <WrapperComp
      className={styles.wrapper}
      {...wrapperProps}
      data-decoration={decoration}
    >
      {contents}
    </WrapperComp>
  );
};
