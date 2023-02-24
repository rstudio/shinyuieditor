import type { TextNodeSettings } from "../../ast_parsing/text_nodes/build_text_node";
import type { UiLeafNodeComponent } from "../uiNodeTypes";

import styles from "./styles.module.css";

export const TextNode: UiLeafNodeComponent<TextNodeSettings> = ({
  uiArguments: { contents, decoration, size },
  wrapperProps,
}) => {
  const WrapperComp = size ?? "span";
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
