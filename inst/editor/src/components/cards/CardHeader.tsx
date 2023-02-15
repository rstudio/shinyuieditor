import { mergeClasses } from "../../utils/mergeClasses";

export function CardHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={mergeClasses(className, "card-header")} {...props} />;
}
