import type { card_body } from "../../../ui-node-definitions/Bslib/card_body";
import { mergeClasses } from "../../../utils/mergeClasses";
import type { ArgsFromInfo } from "../../utils/add_editor_info_to_ui_node";

import styles from "./CardUtils.module.css";

function CardElementChildrenHolder({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.card_children_container}>{children}</div>;
}

export function CardBody({
  className,
  children,
  args = {},
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  args?: ArgsFromInfo<typeof card_body>;
}) {
  const content_styles = {
    gap: args?.gap,
  } as React.CSSProperties;
  return (
    <div
      className={mergeClasses(className, "card-body", styles.card_body_fill)}
      {...props}
    >
      <div className={styles.card_children_container} style={content_styles}>
        {children}
      </div>
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={mergeClasses(className, "card-footer")} {...props}>
      <CardElementChildrenHolder>{children}</CardElementChildrenHolder>
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={mergeClasses(className, "card-header")} {...props}>
      <CardElementChildrenHolder>{children}</CardElementChildrenHolder>
    </div>
  );
}
