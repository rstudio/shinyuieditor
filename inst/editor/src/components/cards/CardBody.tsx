import { mergeClasses } from "../../utils/mergeClasses";

export function CardBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={mergeClasses(className, "card-body")} {...props} />;
}
