import React from "react";

import type { PopoverProps } from "../PopoverEl/PopoverEl";
import { PopoverEl } from "../PopoverEl/PopoverEl";

export const PopoverButton: React.FC<
  Omit<PopoverProps, "triggerEl"> & React.HTMLAttributes<HTMLButtonElement>
> = ({
  children,
  placement = "right",
  showOn = "hover",
  popoverContent,
  bgColor,
  openDelayMs = 0,
  ...passthroughProps
}) => {
  return (
    <PopoverEl
      placement={placement}
      showOn={showOn}
      popoverContent={popoverContent}
      bgColor={bgColor}
      openDelayMs={openDelayMs}
      triggerEl={<button {...passthroughProps}>{children}</button>}
    ></PopoverEl>
  );
};
