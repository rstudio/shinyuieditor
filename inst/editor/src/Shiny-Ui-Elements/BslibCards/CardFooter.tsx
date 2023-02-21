import { mergeClasses } from "../../utils/mergeClasses";

import styles from "./style.module.css";

export function CardFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={mergeClasses(className, "card-footer", styles.card_footer)}
      {...props}
    />
  );
}
