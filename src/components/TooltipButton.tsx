import { Tooltip } from "@chakra-ui/tooltip";
import styled from "@emotion/styled";
import { CSSMeasure } from "GridTypes";
import React from "react";

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type TooltipProps = React.ComponentProps<typeof Tooltip>;

export const TooltipButton = React.forwardRef(
  (
    {
      popoverText,
      popoverPlacement,
      ...props
    }: {
      popoverText: string;
      popoverPlacement?: TooltipProps["placement"];
    } & BaseButtonProps,
    ref
  ) => {
    if (typeof popoverPlacement === "undefined") popoverPlacement = "top";
    return (
      <Tooltip
        label={popoverText}
        placement={popoverPlacement}
        border="1px solid var(--light-grey)"
        backgroundColor="var(--rstudio-white)"
        color="var(--rstudio-grey)"
      >
        <SquareButtonBase {...props}></SquareButtonBase>
      </Tooltip>
    );
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
