import { ButtonHTMLAttributes } from "react";

import classes from "./Button.module.css";

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
