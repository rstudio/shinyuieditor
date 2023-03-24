import type { ButtonHTMLAttributes } from "react";
import React from "react";

import { mergeClasses } from "../../../utils/mergeClasses";

import classes from "./Button.module.css";

type ButtonVariant = "delete" | "regular" | "icon" | "transparent";

type PopoverButtonProps = {
  variant?: ButtonVariant | ButtonVariant[];
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, PopoverButtonProps>(
  (
    { children, variant = "regular", className, ...passthroughProps },
    propRef
  ) => {
    const variant_classes: string = variant
      ? Array.isArray(variant)
        ? variant.map((v) => classes[v]).join(" ")
        : classes[variant]
      : "";
    return (
      <button
        ref={propRef}
        className={mergeClasses(classes.button, variant_classes, className)}
        {...passthroughProps}
      >
        {children}
      </button>
    );
  }
);

export default Button;
