import React from "react";

import type { TooltipOptions } from "../PopoverEl/FloatingPopover";
import {
  MarkdownTooltipContent,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../PopoverEl/FloatingPopover";

import Button from "./Button/Button";

type ButtonCompProps = React.ComponentProps<typeof Button>;
export const PopoverButton: React.FC<
  TooltipOptions &
    ButtonCompProps & {
      tooltipClass?: string;
    } & (
      | {
          use_markdown: true;
          popoverContent: string;
        }
      | {
          use_markdown?: false;
          popoverContent: React.ReactNode;
        }
    )
> = ({
  placement = "right",
  use_markdown = false,
  popoverContent,
  tooltipClass,
  ...passthroughProps
}) => {
  return (
    <Tooltip placement={placement}>
      <TooltipTrigger asChild>
        <Button {...passthroughProps} />
      </TooltipTrigger>
      {use_markdown ? (
        <MarkdownTooltipContent content={popoverContent as string} />
      ) : (
        <TooltipContent>
          <div className={tooltipClass}>{popoverContent}</div>
        </TooltipContent>
      )}
    </Tooltip>
  );
};
