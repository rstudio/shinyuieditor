import React from "react";

import { mergeClasses } from "../../utils/mergeClasses";

import type { BslibCardArguments } from "./BslibCard";
import styles from "./BslibCard.module.css";

export const BslibCardContainer = React.forwardRef(
  (
    {
      children,
      style,
      card_args,
      ...props
    }: React.ComponentPropsWithoutRef<"div"> & {
      card_args: BslibCardArguments;
    },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div ref={ref} style={style} className={styles.card_holder} {...props}>
        <div className={mergeClasses("card", styles.container)}>{children}</div>
      </div>
    );
  }
);
