import "bootstrap/dist/css/bootstrap.css";

import { mergeClasses } from "../../utils/mergeClasses";

import { CardBody } from "./CardBody";
import styles from "./CardContainer.module.css";
import { CardFooter } from "./CardFooter";
import { CardHeader } from "./CardHeader";

export type CardContainerProps = React.ComponentPropsWithoutRef<"div"> & {
  body?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export function CardContainer({
  children,
  header,
  body,
  footer,
  className,
  ...props
}: CardContainerProps) {
  return (
    <div
      className={mergeClasses("card", styles.container, className)}
      {...props}
    >
      {header ?? <CardHeader>Empty Header</CardHeader>}
      {body ?? <CardBody>Empty Body</CardBody>}
      {footer ?? <CardFooter>Empty Footer</CardFooter>}
      {children}
    </div>
  );
}
