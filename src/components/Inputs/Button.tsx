import type { ButtonHTMLAttributes } from "react";

import classes from "./Button.module.css";

const Button: React.FC<
  {
    variant?: "delete" | "regular" | "icon";
    className?: string;
  } & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, variant = "regular", className, ...passthroughProps }) => {
  return (
    <button
      className={
        classes.button +
        " " +
        classes[variant] +
        (className ? " " + className : "")
      }
      {...passthroughProps}
    >
      {children}
    </button>
  );
};

export default Button;
