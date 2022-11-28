import type { ButtonHTMLAttributes } from "react";
import React from "react";

import "balloon-css";
import Button from "../Inputs/Button/Button";

type TooltipPositions =
  | "left"
  | "right"
  | "up"
  | "down"
  | "up-left"
  | "up-right"
  | "down-left"
  | "down-right";

type TooltipSizes = "fit" | "large" | "medium" | "small";
export function Tooltip({
  text,
  position = "down",
  size,
  children,
}: {
  text: string;
  position?: TooltipPositions;
  size?: TooltipSizes;
  children: React.ReactNode;
}) {
  return (
    <span
      aria-label={text}
      data-balloon-pos={position}
      data-balloon-length={size}
    >
      {children}
    </span>
  );
}

export function TooltipButton({
  text,
  position = "down",
  size,
  children,
  ...buttonArgs
}: {
  text: string;
  position?: TooltipPositions;
  size?: TooltipSizes;
  children: React.ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      aria-label={text}
      data-balloon-pos={position}
      data-balloon-length={size}
      variant="icon"
      {...buttonArgs}
    >
      {children}
    </Button>
  );
}
