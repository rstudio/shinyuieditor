import { mergeClasses } from "../../utils/mergeClasses";

import styles from "./style.module.css";

export function CardHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={mergeClasses(className, "card-header", styles.card_header)}
      {...props}
    />
  );
}
