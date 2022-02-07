import { ButtonHTMLAttributes } from "react";
import classes from "./Button.module.css";

type PropsForEl<T extends HTMLElement> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;

const Button: React.FC<
  {
    variant?: "delete" | "regular";
  } & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, variant = "regular", ...passthroughProps }) => {
  return (
    <button
      className={classes.button + " " + classes[variant]}
      {...passthroughProps}
    >
      {children}
    </button>
  );
};

export default Button;
