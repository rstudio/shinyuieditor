import React from "react";

import type { TooltipOptions } from "../PopoverEl/FloatingPopover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../PopoverEl/FloatingPopover";

import Button from "./Button/Button";

type ButtonCompProps = React.ComponentProps<typeof Button>;
export const PopoverButton: React.FC<
  TooltipOptions &
    ButtonCompProps & {
      popoverContent: React.ReactNode;
      tooltipClass?: string;
    }
> = ({
  placement = "right",
  popoverContent,
  tooltipClass,
  ...passthroughProps
}) => {
  return (
    <Tooltip placement={placement}>
      <TooltipTrigger asChild>
        <Button {...passthroughProps} />
      </TooltipTrigger>
      <TooltipContent>
        <div className={tooltipClass}>{popoverContent}</div>
      </TooltipContent>
    </Tooltip>
  );
};
