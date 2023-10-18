import type { ButtonHTMLAttributes } from "react";
import React from "react";

import { mergeClasses } from "../../../utils/mergeClasses";

import classes from "./Button.module.css";

type ButtonVariant =
  | "delete"
  | "regular"
  | "icon"
  | "transparent"
  | "secondary";

type PopoverButtonProps = {
  variant?: ButtonVariant | ButtonVariant[];
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// TODO: Convert styling to tailwind here
// const variantClasses = {
//   regular: "border-rstudio-blue",
//   delete: "border-red",
//   icon: "border-transparent border-0 inline-grid place-content-center p-2 aspect-square",
//   transparent: "border-transparent border-0 bg-transparent",
//   secondary: "bg-rstudio-grey/10",
// };

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
        className={mergeClasses(
          classes["button"],
          // "disabled:cursor-not-alowed border border-transparent px-4 py-2 rounded bg-rstudio-white inline-flex items-center justify-center g-1 center",
          variant_classes,
          className
        )}
        {...passthroughProps}
      >
        {children}
      </button>
    );
  }
);

export default Button;
