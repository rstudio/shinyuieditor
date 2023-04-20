import type { card_body_fill } from "ui-node-definitions/src/Bslib/card_body_fill";

import { mergeClasses } from "../../../utils/mergeClasses";
import type { args_from_info } from "../../utils/add_editor_info_to_ui_node";

import styles from "./CardUtils.module.css";

function CardElementChildrenHolder({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.card_children_container}>{children}</div>;
}

export function CardBodyFill({
  className,
  children,
  args = {},
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  args?: args_from_info<typeof card_body_fill>;
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
