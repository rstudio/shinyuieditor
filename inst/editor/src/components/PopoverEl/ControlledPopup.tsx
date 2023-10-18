import React from "react";

import { mergeClasses } from "../../utils/mergeClasses";

import { Tooltip, TooltipContent, TooltipTrigger } from "./FloatingPopover";

const accentBarStyles = {
  warning: "bg-warning",
  error: "bg-danger",
  success: "bg-success",
  info: "bg-rstudio-blue",
};

export function ControlledPopup({
  isOpen,
  onClose,
  children,
  content,
  accent,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  content: React.ReactNode;
  accent?: keyof typeof accentBarStyles;
}) {
  return (
    <Tooltip
      open={isOpen}
      // By letting the tooltip have this control we can make sure that the
      // user can close the tooltip by clicking outside of it
      onOpenChange={() => onClose()}
      placement="left"
    >
      <TooltipTrigger asChild>{children}</TooltipTrigger>

      <TooltipContent>
        <div
          className={mergeClasses(
            "p-2 rounded-standard bg-rstudio-white w-64 relative"
          )}
        >
          {accent && (
            <div
              className={mergeClasses(
                "absolute -left-2 -top-2 -bottom-2 w-[6px]",
                accentBarStyles[accent]
              )}
            />
          )}
          {content}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
