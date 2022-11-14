import type { ButtonHTMLAttributes } from "react";

import classes from "./Button.module.css";

type ButtonVariant = "delete" | "regular" | "icon" | "transparent";
const Button: React.FC<
  {
    variant?: ButtonVariant | ButtonVariant[];
    className?: string;
  } & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, variant = "regular", className, ...passthroughProps }) => {
  const variant_classes: string = variant
    ? Array.isArray(variant)
      ? variant.map((v) => classes[v]).join(" ")
      : classes[variant]
    : "";
  return (
    <button
      className={
        classes.button +
        " " +
        variant_classes +
        (className ? " " + className : "")
      }
      {...passthroughProps}
    >
      {children}
    </button>
  );
};

export default Button;
