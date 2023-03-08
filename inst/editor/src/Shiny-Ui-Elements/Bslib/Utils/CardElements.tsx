import { mergeClasses } from "../../../utils/mergeClasses";

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
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={mergeClasses(className, "card-body", styles.card_body)}
      {...props}
    >
      <CardElementChildrenHolder>{children}</CardElementChildrenHolder>
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={mergeClasses(className, "card-footer", styles.card_footer)}
      {...props}
    >
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
    <div
      className={mergeClasses(className, "card-header", styles.card_header)}
      {...props}
    >
      <CardElementChildrenHolder>{children}</CardElementChildrenHolder>
    </div>
  );
}
