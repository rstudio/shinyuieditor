import { mergeClasses } from "../../utils/mergeClasses";

import styles from "./style.module.css";

export function CardBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={mergeClasses(className, "card-body", styles.card_body)}
      {...props}
    />
  );
}
