import styled from "@emotion/styled";
import { CSSMeasure } from "GridTypes";
import React from "react";

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const TooltipButton = React.forwardRef(
  (
    {
      popoverText,
      ...props
    }: {
      popoverText: string;
    } & BaseButtonProps,
    ref
  ) => {
    return <SquareButtonBase title={popoverText} {...props}></SquareButtonBase>;
  }
);

export const tooltipButtonSize: CSSMeasure = "1rem";

const SquareButtonBase = styled.button({
  width: tooltipButtonSize,
  height: tooltipButtonSize,
  display: "grid",
  placeContent: "center",
  color: "var(--rstudio-blue, pink)",
  "&.disabled": {
    cursor: "help",
    color: "var(--light-grey, pink)",
  },
});
