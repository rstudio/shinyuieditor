import { mergeClasses } from "../../utils/mergeClasses";

export function CardFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={mergeClasses(className, "card-footer")} {...props} />;
}
