import React from "react";

import type { Placement } from "@floating-ui/react";

import { mergeClasses } from "../../utils/mergeClasses";

import type { TooltipOptions } from "./FloatingPopover";
import { Tooltip, TooltipContent, TooltipTrigger } from "./FloatingPopover";

const accentBarStyles = {
  warning: "bg-warning",
  error: "bg-danger",
  success: "bg-success",
  info: "bg-rstudio-blue",
};

type ControlledPopeverProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  content: React.ReactNode;
  accent?: keyof typeof accentBarStyles;
  placement?: Placement;
  description: string;
};

export function ControlledPopup({
  isOpen,
  onClose,
  children,
  content,
  accent,
  description,
  ...tooltipOptions
}: ControlledPopeverProps & TooltipOptions) {
  return (
    <Tooltip
      open={isOpen}
      // By letting the tooltip have this control we can make sure that the
      // user can close the tooltip by clicking outside of it
      onOpenChange={() => onClose()}
      {...tooltipOptions}
    >
      <TooltipTrigger asChild noToggle>
        {children}
      </TooltipTrigger>

      <TooltipContent>
        <div
          className={mergeClasses(
            "p-2 rounded-standard bg-rstudio-white w-64 relative"
          )}
          aria-label={description}
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

// TODO: Flesh this out with associated trigger and content components
// in the namespaced ClickToOpenPopover.Trigger and ClickToOpenPopover.Content format
export function ClickToOpenPopover({
  onClose,
  ...props
}: Omit<ControlledPopeverProps, "isOpen">) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ControlledPopup
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        onClose();
      }}
      {...props}
    />
  );
}
