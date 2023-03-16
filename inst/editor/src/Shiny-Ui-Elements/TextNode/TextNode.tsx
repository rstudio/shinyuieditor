import type { TextNodeSettings } from "../../ast_parsing/text_nodes/is_text_node";
import { size_to_wrapper } from "../../ast_parsing/text_nodes/is_text_node";
import type { UiNodeComponent } from "../uiNodeTypes";

import styles from "./styles.module.css";

export const TextNode: UiNodeComponent<
  TextNodeSettings,
  { TakesChildren: false }
> = ({
  uiArguments: { contents, decoration, size = "default" },
  wrapperProps,
}) => {
  const WrapperComp = size_to_wrapper[size];

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
